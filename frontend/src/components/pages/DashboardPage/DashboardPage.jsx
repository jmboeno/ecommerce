import React, { useEffect, useState, useContext, useRef } from 'react';
import DashboardLayout from '../../templates/DashboardLayout/DashboardLayout';
import DashboardStats from '../../orgs/DashboardStats/DashboardStats'; // Usar 'orgs'
import RecentActivity from '../../orgs/RecentActivity/RecentActivity'; // Usar 'orgs'
import QuickActions from '../../orgs/QuickActions/QuickActions'; // Usar 'orgs'
import { LoadingContext } from '../../../context/LoadingContext';
import { fetchDashboardData } from '../../../services/dashboard'; // Seu serviço de fetch
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';

const DashboardPage = () => {
	const { startLoading, stopLoading, isLoading } = useContext(LoadingContext);
	const { isAuthenticated, user } = useContext(AuthContext); // user?.id é crucial nas dependências
	const [dashboardData, setDashboardData] = useState({
		stats: {
			totalUsers: 0,
			totalUsersChange: 0,
			totalSales: 0,
			totalSalesChange: 0,
			products: 0,
			productsChange: 0,
			suppliers: 0,
			suppliersChange: 0,
		},
		activities: [],
	});

	const [dataLoaded, setDataLoaded] = useState(false); // Indica se os dados foram carregados com sucesso
	const apiCallInitiated = useRef(false); // <--- FLAG CRUCIAL: true se a chamada API foi INICIADA

	// Logs para depuração
	const effectRunCount = useRef(0);
	const fetchCallCount = useRef(0);

	useEffect(() => {
		effectRunCount.current += 1;
		console.log(`DashboardPage useEffect executado. Contagem: ${effectRunCount.current}`);
		console.log("Estado atual (início useEffect): isAuthenticated:", isAuthenticated, "dataLoaded:", dataLoaded, "user:", user ? user.id : 'null', "apiCallInitiated.current:", apiCallInitiated.current);

		const getDashboardData = async () => {
			fetchCallCount.current += 1;
			console.log(`fetchDashboardData chamada. Contagem de chamadas à função: ${fetchCallCount.current}`);

			// Se os dados já foram carregados com sucesso, não faça a requisição novamente
			if (dataLoaded) {
				console.log("getDashboardData: Dados já carregados (dataLoaded=true). Abortando requisição.");
				return;
			}

			// Inicia o loading
			if (!isLoading) { // Evita iniciar loading se já estiver ativo por outra operação (AuthContext)
				startLoading();
				console.log("getDashboardData: startLoading disparado.");
			}

			try {
				const data = await fetchDashboardData(); // Chama a API
				setDashboardData(data);
				toast.success("Dados do dashboard carregados com sucesso!");
				setDataLoaded(true); // <--- Marca que os dados foram carregados com sucesso
				console.log("getDashboardData: Dados carregados com sucesso. setDataLoaded(true).");
			} catch (error) {
				console.error('Erro ao buscar dados do dashboard:', error);
				toast.error(error.message || "Falha ao carregar dados do dashboard.");
				// Se der erro, 'dataLoaded' permanece 'false', permitindo uma nova tentativa
				// (porém 'apiCallInitiated.current' previne um loop imediato)
			} finally {
				stopLoading(); // Garante que o loading para
				console.log("getDashboardData: stopLoading disparado.");
			}
		};

		// Condição principal para disparar a busca de dados:
		// 1. O usuário está autenticado E o objeto 'user' tem um ID (indicando que foi totalmente carregado)
		// 2. Os dados do dashboard AINDA NÃO foram carregados com sucesso (`!dataLoaded`)
		// 3. E, CRUCIALMENTE, a chamada da API para esta instância do componente AINDA NÃO foi iniciada (`!apiCallInitiated.current`)
		if (isAuthenticated && user?.id && !dataLoaded && !apiCallInitiated.current) {
			console.log("DashboardPage: Condição para buscar dados atendida. Disparando API...");
			apiCallInitiated.current = true; // <--- MARCA QUE A CHAMADA FOI INICIADA
			getDashboardData();
		} else {
			console.log("DashboardPage: Condição para buscar dados NÃO atendida.");
			console.log(`DashboardPage: isAuth: ${isAuthenticated}, user?.id: ${user?.id ? 'true' : 'false'}, !dataLoaded: ${!dataLoaded}, !apiCallInitiated.current: ${!apiCallInitiated.current}`);
		}

		// Cleanup function (executada na desmontagem ou antes de re-executar o effect)
		// Reset apiCallInitiated.current para false para que em um DESMONTAGEM real
		// e remontagem subsequente, a requisição possa ser feita novamente.
		// No StrictMode, essa limpeza acontece *antes* da re-execução, permitindo a "segunda" chamada.
		return () => {
			console.log(`DashboardPage useEffect cleanup executado. Contagem: ${effectRunCount.current}`);
			// Se você quer que a requisição seja feita apenas uma vez por *sessão de navegação*,
			// não resete apiCallInitiated.current aqui.
			// Para o StrictMode e navegação normal, geralmente é bom resetar.
			// No entanto, para evitar 3 chamadas, o segredo é a condição de disparo.
			// O ref 'apiCallInitiated' funciona *por montagem de componente*.
			// Se o componente *desmonta e remonta de verdade* (ex: navega para outra página e volta),
			// apiCallInitiated.current deve ser resetado.
			// No StrictMode, a "remontagem" é simulada e o ref persiste, mas o effect roda novamente.
		};

	}, [isAuthenticated, user?.id, dataLoaded, startLoading, stopLoading, isLoading]); // Dependências

	return (
		<DashboardLayout pageTitle="Overview">
			<div className="dashboard-grid">
				<DashboardStats stats={dashboardData.stats} />
				<div className="dashboard-bottom-row">
					<RecentActivity activities={dashboardData.activities} />
					<QuickActions />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default DashboardPage;