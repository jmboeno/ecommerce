// front/src/components/pages/ActivationPage/ActivationPage.jsx
import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../templates/AuthLayout/AuthLayout.jsx";
import Text from "../../atoms/Text/Text.jsx";
import Button from "../../atoms/Button/Button.jsx"; // Importe o componente Button
import { LoadingContext } from "../../../context/LoadingContext.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { toast } from "react-toastify";

const ActivationPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const { startLoading, stopLoading, isLoading } = useContext(LoadingContext);
	const { activate, logout, resendActivationToken } = useContext(AuthContext);

	const [activationStatus, setActivationStatus] = useState("verifying"); // "verifying", "success", "error"
	const [message, setMessage] = useState("Please wait while we verify your account...");

	const apiCallInitiated = useRef(false);
	const effectRunCount = useRef(0);
	const activateCallCount = useRef(0);

	useEffect(() => {
		effectRunCount.current += 1;
		console.log(`ActivationPage useEffect executado. Contagem: ${effectRunCount.current}`);
		console.log("Estado atual (início useEffect Activation): token:", !!token, "status:", activationStatus, "apiCallInitiated.current:", apiCallInitiated.current);

		const handleActivation = async () => {
			activateCallCount.current += 1;
			console.log(`handleActivation chamada. Contagem de chamadas à função: ${activateCallCount.current}`);

			if (apiCallInitiated.current) {
				console.log("handleActivation: Chamada à API já iniciada. Abortando nova tentativa.");
				return;
			}

			if (!token) {
				setActivationStatus("error");
				setMessage("Token de ativação não encontrado na URL.");
				stopLoading();
				return;
			}

			apiCallInitiated.current = true; // Marca que a chamada foi iniciada
			startLoading(); // Inicia o loading
			try {
				const result = await activate(token); // Chama a função "activate" do AuthContext
				if (result.success) {
					setActivationStatus("success");
					setMessage(result.message || "Sua conta foi ativada com sucesso! Você será redirecionado em breve.");
					console.log("ActivationPage: Ativação bem-sucedida. Redirecionando em 3s.");
					setTimeout(() => {
						navigate("/login");
					}, 3000);
				} else {
					setActivationStatus("error");
					setMessage(result.message || "Falha na ativação da conta. Token inválido ou expirado.");
					console.log("ActivationPage: Ativação falhou. Mensagem:", result.message);
				}
			} catch (error) {
				setActivationStatus("error");
				setMessage(error.message || "Ocorreu um erro ao ativar sua conta. Tente novamente ou entre em contato com o suporte.");
				console.error("ActivationPage: Erro na ativação:", error);
			} finally {
				stopLoading();
				console.log("ActivationPage: stopLoading disparado para ativação.");
			}
		};

		if (token && !apiCallInitiated.current) {
			console.log("ActivationPage: Condição para ativar atendida. Disparando handleActivation.");
			handleActivation();
		} else {
			console.log("ActivationPage: Condição para ativar NÃO atendida.");
		}

		return () => {
			console.log(`ActivationPage useEffect cleanup executado. Contagem: ${effectRunCount.current}`);
		};

	}, [token, activate, navigate, logout, startLoading, stopLoading]); // Dependências do useEffect

	const title = activationStatus === "success" ? "Conta Ativada!" : "Ativando Sua Conta";
	const description = message;

	const handleGoToLogin = () => {
		navigate("/login");
	};

	const handleResendToken = async () => {
		if (token) { // <--- Usa o token da URL
			// Não precisa mais do prompt, o backend extrai o email
			const result = await resendActivationToken(token); // <--- Passa o token da URL
			// O toast já será exibido pelo AuthContext
		} else {
			toast.error("Nenhum token disponível na URL para reenviar."); // Mensagem se o token não estiver na URL
		}
	};


	return (
		<AuthLayout title={title} description={description}>
			{/* Container para alinhar tudo centralizado */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center", // Centraliza horizontalmente
				justifyContent: "center", // Centraliza verticalmente (se houver espaço)
				gap: "20px", // Espaço entre os itens
				textAlign: "center", // Centraliza o texto
				width: "100%", // Garante que o div ocupa o espaço disponível
			}}>
				{/* O spinner global já é exibido */}
				{/* Ícone de status final (sucesso/erro) */}
				{activationStatus !== "verifying" && (
					<Text style={{ fontSize: "3rem" }}>
						{activationStatus === "success" ? (
							<span style={{ color: "var(--success-color)" }}>✅</span>
						) : (
							<span style={{ color: "var(--error-color)" }}>❌</span>
						)}
					</Text>
				)}

				{/* Botões visíveis apenas se a ativação NÃO está em andamento e NÃO foi um sucesso imediato */}
				{activationStatus === "error" && (
					<div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "300px" }}>
						<Button onClick={handleGoToLogin} variant="primary" disabled={isLoading}>
							Ir para o Login
						</Button>
						<Button onClick={handleResendToken} variant="secondary" disabled={isLoading}>
							Reenviar Token
						</Button>
					</div>
				)}
			</div>
		</AuthLayout>
	);
};

export default ActivationPage;