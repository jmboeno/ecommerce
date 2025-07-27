// front/src/components/pages/OverviewContentPage/OverviewContentPage.jsx
// Este é o conteúdo da aba "Visão Geral" (Overview)
import React, { useContext } from "react";
import DashboardStats from "../../orgs/DashboardStats/DashboardStats.jsx";
import RecentActivity from "../../orgs/RecentActivity/RecentActivity.jsx";
import QuickActions from "../../orgs/QuickActions/QuickActions.jsx";
import Text from "../../atoms/Text/Text.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Icon from "../../atoms/Icon/Icon.jsx";
import StatsCard from "../../mols/StatsCard/StatsCard.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom"; // Se usar navegação interna

const OverviewContentPage = ({ dashboardData, isLoading }) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate(); // Para botões de ação do cliente

	if (!user || !user.role) {
		return <Text variant="body" style={{ textAlign: "center", marginTop: "50px" }}>Carregando conteúdo da visão geral...</Text>;
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
			return (
				<>
					<RecentActivity activities={dashboardData.activities} />
					{/* Ações rápidas do cliente (se você as quiser aqui, senão remova este div) */}
					<div style={{
						display: "flex",
						flexDirection: "column",
						gap: "15px",
						padding: "20px",
						border: "1px solid var(--border-color)",
						borderRadius: "var(--rounded-md)",
						boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
				</>
			);
		default:
			return (
				<Text variant="body" style={{ textAlign: "center", marginTop: "50px" }}>Sua role não possui opções de dashboard definidas ou não é reconhecida.</Text>
			);
	}
};

export default OverviewContentPage;