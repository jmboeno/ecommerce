// jmboeno/ecommerce/ecommerce-1452d409c9970bb92bc8d44e563a83479f8fa910/frontend/src/components/pages/DashboardPage/DashboardPage.jsx
import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
// Remova Routes e Route daqui, pois não teremos mais rotas aninhadas neste componente
// import { Routes, Route, useNavigate } from "react-router-dom"; // REMOVER
import { useNavigate } from "react-router-dom"; // Manter useNavigate se usado internamente
import DashboardLayout from "../../templates/DashboardLayout/DashboardLayout.jsx";
import DashboardStats from "../../orgs/DashboardStats/DashboardStats.jsx";
import RecentActivity from "../../orgs/RecentActivity/RecentActivity.jsx";
import QuickActions from "../../orgs/QuickActions/QuickActions.jsx";
import { LoadingContext } from "../../../context/LoadingContext.jsx";
import { fetchDashboardData } from "../../../services/dashboard.js";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Text from "../../atoms/Text/Text.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Icon from "../../atoms/Icon/Icon.jsx";
import StatsCard from "../../mols/StatsCard/StatsCard.jsx";
// Não importamos mais ProfilePage ou OrdersContentPage aqui, pois não serão rotas aninhadas.
// import ProfilePage from "../ProfilePage/ProfilePage.jsx";
// import OrdersContentPage from "../OrdersContentPage/OrdersContentPage.jsx";

const DashboardPage = () => {
	const { startLoading, stopLoading, isLoading } = useContext(LoadingContext);
	const { isAuthenticated, user } = useContext(AuthContext);
	const [dashboardData, setDashboardData] = useState({
		stats: { /* ... */ },
		activities: [],
	});

	const [dataLoaded, setDataLoaded] = useState(false);
	const apiCallInitiated = useRef(false);

	const effectRunCount = useRef(0);
	const fetchCallCount = useRef(0);

	const navigate = useNavigate();

	const getDashboardData = useCallback(async () => {
		fetchCallCount.current += 1;
		console.log(`fetchDashboardData chamada. Contagem de chamadas à função: ${fetchCallCount.current}`);

		if (dataLoaded) {
			console.log("getDashboardData: Dados já carregados (dataLoaded=true). Abortando requisição.");
			return;
		}

		if (!isLoading) {
			startLoading();
			console.log("getDashboardData: startLoading disparado.");
		}

		try {
			const data = await fetchDashboardData();
			setDashboardData(data);
			toast.success("Dados do dashboard carregados com sucesso!");
			setDataLoaded(true);
			console.log("getDashboardData: Dados carregados com sucesso. setDataLoaded(true).");
		} catch (error) {
			console.error('Erro ao buscar dados do dashboard:', error);
			toast.error(error.message || "Falha ao carregar dados do dashboard.");
		} finally {
			stopLoading();
			console.log("getDashboardData: stopLoading disparado.");
		}
	}, [dataLoaded, isLoading, startLoading, stopLoading]);

	useEffect(() => {
		effectRunCount.current += 1;
		console.log(`DashboardPage useEffect executado. Contagem: ${effectRunCount.current}`);
		console.log("Estado atual (início useEffect): isAuthenticated:", isAuthenticated, "dataLoaded:", dataLoaded, "user:", user ? `ID: ${user.id}, Role: ${user.role}` : "null", "apiCallInitiated.current:", apiCallInitiated.current);

		if (isAuthenticated && user?.id && user?.role && !dataLoaded && !apiCallInitiated.current) {
			console.log("DashboardPage: Condição para buscar dados atendida. Disparando API...");
			apiCallInitiated.current = true;
			getDashboardData();
		} else {
			console.log("DashboardPage: Condição para buscar dados NÃO atendida.");
		}

		return () => {
			console.log(`DashboardPage useEffect cleanup executado. Contagem: ${effectRunCount.current}`);
		};

	}, [isAuthenticated, user?.id, user?.role, dataLoaded, getDashboardData]);

	// Lógica de renderização condicional baseada na role do usuário
	const renderDashboardContent = () => {
		if (!user || !user.role) {
			return <Text variant="body" style={{ textAlign: "center", marginTop: "50px" }}>Carregando opções do dashboard...</Text>;
		}

		switch (user.role) {
			case "Administrador":
				return (
					<>
						<DashboardStats stats={dashboardData.stats} />
						<div className="dashboard-bottom-row">
							<RecentActivity activities={dashboardData.activities} />
							<QuickActions />
						</div>
					</>
				);
			case "Cliente":
				// Agora, como DashboardPage é *a* página de overview para o cliente,
				// ela só mostra as atividades recentes, conforme solicitado anteriormente.
				return (
					<>
						<RecentActivity activities={dashboardData.activities} />
						{/* Se você quiser as ações rápidas do cliente novamente aqui no Overview, descomente */}
						{/*
						<div style={{
							display: "flex",
							flexDirection: "column",
							gap: "15px",
							padding: "20px",
							border: "1px solid var(--border-color)",
							borderRadius: "var(--rounded-md)",
							boxShadow: "var(--shadow-md)",
							backgroundColor: "white",
							marginTop: "20px"
						}}>
							<Text variant="h4" style={{ textAlign: "center", marginBottom: "10px" }}>Minhas Ações</Text>
							<Button onClick={() => navigate("/dashboard/orders")} variant="primary" disabled={isLoading} style={{ width: "100%" }}>
								<Icon name="sales" /> Meus Pedidos
							</Button>
							<Button onClick={() => alert("Ver meus favoritos!")} variant="secondary" disabled={isLoading} style={{ width: "100%" }}>
								<Icon name="products" /> Meus Favoritos
							</Button>
							<Button onClick={() => navigate("/dashboard/profile")} variant="secondary" disabled={isLoading} style={{ width: "100%" }}>
								<Icon name="settings" /> Meu Perfil
							</Button>
							<Button onClick={() => alert("Contatar suporte!")} variant="secondary" disabled={isLoading} style={{ width: "100%" }}>
								<Icon name="mail" /> Contatar Suporte
							</Button>
						</div>
						*/}
					</>
				);
			default:
				return (
					<Text variant="body" style={{ textAlign: "center", marginTop: "50px" }}>Sua role não possui opções de dashboard definidas ou não é reconhecida.</Text>
				);
		}
	};

	return (
		// DashboardLayout agora é usado diretamente por esta página
		<DashboardLayout pageTitle="Visão Geral">
			<div className="dashboard-grid">
				{renderDashboardContent()}
			</div>
		</DashboardLayout>
	);
};

export default DashboardPage;