// front/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
	loginUser,
	registerUser,
	logoutUser,
	fetchCurrentUser,
	refreshToken as authServiceRefreshToken,
	activateAccount,
	resendActivationToken as authServiceResendActivationToken
} from "../services/auth";
import { LoadingContext } from "./LoadingContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthCheckDone, setIsAuthCheckDone] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const initialAuthCheckDone = useRef(false); // <--- Use useRef para a flag de verificação inicial
	const { startLoading, stopLoading, isLoading } = React.useContext(LoadingContext);
	const navigate = useNavigate();

	const isRefreshing = useRef(false); // Ref para controlar se um refresh token já está em andamento
	const refreshPromise = useRef(null); // Ref para armazenar a promessa do refresh token em andamento

	// 1. Define "logout" first, as other functions might depend on it.
	const logout = useCallback(async () => {
		console.log("AuthContext: logout sendo chamado.");
		const currentRefreshToken = localStorage.getItem("refreshToken");
		if (currentRefreshToken) {
			try {
				await logoutUser(currentRefreshToken);
			} catch (error) {
				console.error("AuthContext: Erro ao notificar o backend sobre o logout:", error);
			}
		}
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");
		setIsAuthenticated(false);
		setUser(null);
		toast.info("Você foi desconectado.");
		navigate("/login");
		isRefreshing.current = false; // Resetar flag se deslogar
		refreshPromise.current = null; // Resetar promessa
		initialAuthCheckDone.current = false; // Resetar flag inicial para permitir nova verificação em futura montagem
	}, [navigate]);

	// 2. Define "refresh" com o mecanismo de fila
	const refresh = useCallback(async () => {
		console.log("AuthContext: refresh sendo chamado (com fila).");

		if (isRefreshing.current) {
			console.log("AuthContext: Refresh já em andamento. Aguardando promessa existente.");
			return refreshPromise.current;
		}

		isRefreshing.current = true; // Marca que o refresh está em andamento
		const storedRefreshToken = localStorage.getItem("refreshToken");

		if (!storedRefreshToken) {
			console.log("AuthContext: Nenhum refresh token encontrado para iniciar refresh. Deslogando.");
			isRefreshing.current = false; // Reseta o flag
			refreshPromise.current = null; // Reseta a promessa
			await logout(); // Desloga imediatamente se não há refresh token
			throw new Error("No refresh token available to renew session.");
		}

		// Armazena a promessa do refresh para que outras chamadas possam esperar por ela
		refreshPromise.current = (async () => {
			try {
				const response = await authServiceRefreshToken(storedRefreshToken);
				if (response.success) {
					localStorage.setItem("token", response.accessToken);
					localStorage.setItem("refreshToken", response.refreshToken);
					setIsAuthenticated(true);
					setUser(JSON.parse(localStorage.getItem("user")));
					toast.success(response.message || "Sessão renovada com sucesso!");
					console.log("AuthContext: Refresh bem-sucedido. Sessão revalidada.");
					return { success: true, accessToken: response.accessToken, refreshToken: response.refreshToken  };
				} else {
					console.log("AuthContext: authServiceRefreshToken falhou. Mensagem:", response.message);
					await logout(); // Desloga se o refresh falhar
					throw new Error(response.message || "Falha ao renovar token.");
				}
			} catch (error) {
				console.error("AuthContext: Erro na execução de authServiceRefreshToken:", error);
				await logout(); // Desloga em qualquer erro durante o refresh
				throw error;
			} finally {
				isRefreshing.current = false; // Reseta o flag, refresh concluído
				refreshPromise.current = null; // Limpa a promessa
				setIsAuthCheckDone(true);
			}
		})(); // Executa a função imediatamente

		return refreshPromise.current; // Retorna a promessa para quem chamou
	}, [logout]); // Depende de logout

	// 3. Define "fetchUser"
	const fetchUser = useCallback(async () => {
		console.log("AuthContext: fetchUser sendo chamado para validar token.");
		try {
			const storedToken = localStorage.getItem("token");
			if (!storedToken) {
				console.log("AuthContext: Nenhum access token no localStorage para fetchUser.");
				return { success: false, message: "Nenhum access token encontrado." };
			}
			const userData = await fetchCurrentUser(); // Tenta usar o access token
			if (userData.success && userData.user) {
				setUser(userData.user);
				setIsAuthenticated(true);
				console.log("AuthContext: Usuário carregado e autenticado via fetchCurrentUser.");
				return { success: true, user: userData.user };
			} else {
				console.log("AuthContext: fetchCurrentUser falhou. Mensagem:", userData.message);
				console.log("AuthContext: Tentando refrescar token após falha no fetchUser.");
				// Tenta refrescar. O "refresh()" já tem a lógica de fila.
				await refresh(); // Chama o refresh, que esperará na fila se necessário
				const refreshedUser = localStorage.getItem("user");
				return { success: true, user: JSON.parse(refreshedUser) }; // Retorna o usuário após refresh
			}
		} catch (error) {
			console.error("AuthContext: Erro ao buscar usuário atual em fetchUser:", error);
			// Se o erro for 401/403 ou outro, tenta o refresh ou desloga.
			// O "refresh()" já lida com deslogar se a renovação falhar.
			await logout(); // Desloga se algo mais der errado ou refresh falhar
			throw error;
		}
	}, [refresh, logout]); // Depende de refresh e logout

	// 4. Define "login"
	const login = useCallback(async (credentials) => {
		console.log("AuthContext: login function sendo chamada com credenciais:", credentials);
		startLoading();
		try {
			const response = await loginUser(credentials); // Chama a função de serviço
			console.log("AuthContext: Resposta de loginUser:", response);

			if (response.success) {
				localStorage.setItem("token", response.token);
				localStorage.setItem("refreshToken", response.refreshToken);
				localStorage.setItem("user", JSON.stringify(response.user));
				setUser(response.user);
				setIsAuthenticated(true);
				toast.success(response.message);
				console.log("AuthContext: Login bem-sucedido.");
				navigate('/dashboard');
				return { success: true };
			} else {
				toast.error(response.message);
				console.log("AuthContext: Login falhou (resposta do serviço não sucesso).");
				return { success: false, message: response.message };
			}
		} catch (error) {
			console.error("AuthContext: Erro na execução de loginUser:", error);
			toast.error(error.message || "Erro ao tentar fazer login.");
			throw error;
		} finally {
			stopLoading();
			console.log("AuthContext: stopLoading disparado no login.");
		}
	}, [startLoading, stopLoading, navigate]); // Dependências do useCallback: startLoading, stopLoading.

	// 5. Define "register" e "activate"
	const register = useCallback(async (userData) => {
		console.log("AuthContext: register sendo chamado.");
		startLoading();
		try {
			const response = await registerUser(userData);
			if (response.success) {
				toast.success(response.message);
				navigate("/login");
				return { success: true };
			} else {
				toast.error(response.message);
				return { success: false, message: response.message };
			}
		} catch (error) {
			console.error("AuthContext: Registro falhou:", error);
			toast.error(error.message);
			throw error;
		} finally {
			stopLoading();
		}
	}, [startLoading, stopLoading, navigate]);

	const activate = useCallback(async (activationId) => {
		console.log("AuthContext: activate sendo chamado.");
		startLoading();
		try {
			const response = await activateAccount(activationId); // Chama o serviço real
			if (response.success) {
				toast.success(response.message);
				console.log("AuthContext: Ativação bem-sucedida.");
				return { success: true, message: response.message }; // Retorna mensagem de sucesso
			} else {
				toast.error(response.message);
				console.log("AuthContext: Ativação de conta falhou.");
				return { success: false, message: response.message }; // Retorna mensagem de erro
			}
		} catch (error) {
			console.error('AuthContext: Ativação de conta falhou:', error);
			toast.error(error.message);
			throw error;
		} finally {
			stopLoading();
		}
	}, [startLoading, stopLoading]);

	const resendActivationToken = useCallback(async (tokenFromPage) => { // <--- Aceita o token
		console.log("AuthContext: resendActivationToken sendo chamado com token:", tokenFromPage);
		startLoading();
		try {
			const result = await authServiceResendActivationToken(tokenFromPage); // <--- Passa o token para o serviço
			if (result.success) {
				toast.success(result.message);
				console.log("AuthContext: Reenvio de token bem-sucedido.");
				return { success: true, message: result.message };
			} else {
				toast.error(result.message);
				console.log("AuthContext: Reenvio de token falhou. Mensagem:", result.message);
				return { success: false, message: result.message };
			}
		} catch (error) {
			console.error("AuthContext: Erro na execução de resendActivationToken:", error);
			toast.error(error.message || "Erro ao tentar reenviar token de ativação.");
			throw error;
		} finally {
			stopLoading();
		}
	}, [startLoading, stopLoading]);

	useEffect(() => {
		console.log("AuthContext useEffect inicial: Verificando status de autenticação na montagem do Provider.");

		if (initialAuthCheckDone.current) {
			console.log("AuthContext useEffect: Verificação inicial já concluída. Abortando.");
			return;
		}

		initialAuthCheckDone.current = true;
		console.log("AuthContext useEffect: Flag marcada como true imediatamente.");

		const revalidateSession = async () => {
			startLoading();
			try {
				const storedToken = localStorage.getItem("token");
				const storedRefreshToken = localStorage.getItem("refreshToken");
				const storedUserRaw = localStorage.getItem("user");

				// Prioridade: se houver refresh token, tente renovar a sessão.
				if (storedRefreshToken) {
					console.log("AuthContext: Refresh token encontrado. Tentando renovar sessão.");
					try {
						await refresh(); // Chama a função refresh centralizada. Ela lida com sucesso/falha e logout.
						console.log("AuthContext: Sessão renovada com sucesso ao carregar.");
						// Se o refresh foi bem-sucedido, isAuthenticated e user já estão atualizados.
					} catch (refreshError) {
						console.error("AuthContext: Falha ao renovar sessão com refresh token no useEffect inicial.", refreshError);
						// refresh() já chamou logout.
					}
				} else if (storedToken && storedUserRaw) {
					// Se não há refresh token, mas há access token e user, tenta validar via access token.
					// Isso pode acontecer se o access token for mais longo que o refresh (não ideal)
					// ou se o refresh token foi limpo por algum motivo.
					console.log("AuthContext: Access token e usuário encontrados, mas sem refresh token. Tentando validar sessão.");
					try {
						const parsedUser = JSON.parse(storedUserRaw);
						setUser(parsedUser); // Rápida atualização de estado
						setIsAuthenticated(true);
						await fetchUser(); // Tenta validar access token (e pode chamar refresh se falhar, mas já estaríamos sem refresh token aqui)
						console.log("AuthContext: Sessão validada via access token ao carregar.");
					} catch (parseError) {
						console.error("AuthContext: Erro ao parsear storedUserRaw no useEffect principal ou fetchUser falhou:", parseError);
						await logout();
					}
				} else {
					// Se não há nenhum token válido ou usuário no localStorage, garante que não está autenticado.
					console.log("AuthContext: Tokens ausentes ou incompletos no localStorage. Não autenticado.");
					setIsAuthenticated(false);
					setUser(null);
					localStorage.removeItem("token");
					localStorage.removeItem("refreshToken");
					localStorage.removeItem("user");
					// Se já está sem tokens, não precisa chamar logout, apenas garantir o estado limpo
				}
			} catch (error) {
				console.error("AuthContext: Erro geral no revalidateSession:", error);
				await logout();
			} finally {
				stopLoading();
				console.log("AuthContext: Verificação inicial concluída.");
			}
		};

		revalidateSession();
	}, [fetchUser, logout, refresh, startLoading, stopLoading]);

	const authContextValue = useMemo(() => ({
		isAuthenticated,
		isAuthCheckDone,
		user,
		login,
		register,
		activate,
		logout,
		resendActivationToken,
		isLoadingAuth: isLoading,
	}), [isAuthenticated, isAuthCheckDone, user, login, register, activate, logout, resendActivationToken, isLoading]);

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};