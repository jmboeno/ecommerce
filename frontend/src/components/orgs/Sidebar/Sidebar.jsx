// jmboeno/ecommerce/ecommerce-1452d409c9970bb92bc8d44e563a83479f8fa910/frontend/src/components/orgs/Sidebar/Sidebar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../atoms/Icon/Icon.jsx";
import Text from "../../atoms/Text/Text.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import "./Sidebar.css";

const allSidebarItems = [
	// Itens para Administrador
	{ name: "Overview", icon: "home", path: "/dashboard", roles: ["Administrador", "Cliente"] }, // <--- Path para /dashboard
	{ name: "Users", icon: "users", path: "/dashboard/users", roles: ["Administrador"] },
	{ name: "Suppliers", icon: "suppliers", path: "/dashboard/suppliers", roles: ["Administrador"] },
	{ name: "Products", icon: "products", path: "/dashboard/products", roles: ["Administrador"] },
	{ name: "Sales", icon: "sales", path: "/dashboard/sales", roles: ["Administrador"] },
	{ name: "Transactions", icon: "transactions", path: "/dashboard/transactions", roles: ["Administrador"] },
	{ name: "Categories", icon: "categories", path: "/dashboard/categories", roles: ["Administrador"] },
	{ name: "Roles", icon: "roles", path: "/dashboard/roles", roles: ["Administrador"] },
	{ name: "Permissions", icon: "permissions", path: "/dashboard/permissions", roles: ["Administrador"] },

	// --- Opções específicas para Cliente ---
	{ name: "Minha Conta", icon: "settings", path: "/profile", roles: ["Cliente"] }, // <--- Path para /profile
	{ name: "Meus Pedidos", icon: "sales", path: "/dashboard/orders", roles: ["Cliente"] }, // Mantido /dashboard/orders por agora
	{ name: "Suporte", icon: "mail", path: "/dashboard/support", roles: ["Cliente"] },
];

const Sidebar = () => {
	const location = useLocation();
	const { user } = useContext(AuthContext);

	const filteredSidebarItems = allSidebarItems.filter(item => {
		if (!user || !user.role) return false;
		// Ajusta para "active" se a URL começa com o caminho do item (útil para /dashboard/users vs /dashboard)
		// OU se o item é "/dashboard" e a rota atual é exatamente "/dashboard"
		// OU se o item é "/profile" e a rota atual é exatamente "/profile"
		const isActive = item.path === location.pathname || (item.path === "/dashboard" && location.pathname.startsWith("/dashboard/")) || location.pathname.startsWith(item.path + '/');
		
		return item.roles.includes(user.role);
	});

	return (
		<aside className="sidebar">
			<div className="sidebar-header">
				<Icon name="business-management-logo" className="logo-icon" />
				<Text variant="body" className="logo-text-dashboard">Business Management</Text>
			</div>
			<nav className="sidebar-nav">
				<ul>
					{filteredSidebarItems.map((item) => (
						<li key={item.name}>
							<Link
								to={item.path}
								className={`sidebar-link ${location.pathname === item.path || (item.path === "/dashboard" && location.pathname.startsWith("/dashboard/")) || location.pathname.startsWith(item.path + '/') ? "active" : ""}`}
							> {/* Ajuste na condição active */}
								<Icon name={item.icon} size="large" />
								<Text variant="body">{item.name}</Text>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;