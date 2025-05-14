import React, { useState } from "react";
import { NavLink as RouterNavLink, Outlet } from "react-router-dom";
import { UserRegistrationProvider } from "../../context/UserRegistration";
import { FaUser } from "react-icons/fa"; // Exemplo de ícone
import styled from "@emotion/styled";

const LayoutContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const Sidebar = styled.aside`
	width: ${props => (props.collapsed ? "60px" : "240px")};
	background-color: #1f1f1f;
	color: white;
	transition: width 0.3s ease;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: ${props => (props.collapsed ? "center" : "flex-start")};
	padding-top: 20px;
	z-index: 1;
	overflow: visible;
`;

const CollapseButton = styled.button`
  position: absolute;
  top: 10px;
  right: -10px;
  background: #333;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Nav = styled.nav`
  margin-top: 40px;
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const NavItem = styled.li`
  margin: 16px 0;
  width: 100%;
`;

const StyledNavLink = styled(RouterNavLink)`
	color: white;
	text-decoration: none;
	padding: 8px 16px;
	display: flex;
	align-items: center;
	transition: background 0.3s ease;
	overflow: visible;

	&:hover {
		background-color: #333333;
	}

	svg {
		flex-shrink: 0;
		min-width: 20px;
		margin-right: ${props => (props.collapsed ? "0" : "8px")};
		transition: margin-right 0.3s ease;
	}

	span {
		opacity: ${props => (props.collapsed ? 0 : 1)};
		visibility: ${props => (props.collapsed ? "hidden" : "visible")};
		transform: ${props => (props.collapsed ? "translateX(-20px)" : "translateX(0)")};
		transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
	}
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 16px;
  overflow: auto;
  background: #f5f5f5;
`;

const BaseLayoutLoggedArea = () => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleSidebar = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<UserRegistrationProvider>
			<LayoutContainer>
				<Sidebar collapsed={collapsed}>
					<CollapseButton onClick={toggleSidebar}>
						{collapsed ? ">" : "<"}
					</CollapseButton>

					<Nav>
						<NavList>
							<NavItem>
								<StyledNavLink to="/logged-area/profile" title="Perfil" collapsed={collapsed}>
									<FaUser />
									<span>Perfil</span>
								</StyledNavLink>
								<StyledNavLink to="/logged-area/pedidos" title="Perfil" collapsed={collapsed}>
									<FaUser />
									<span>Pedidos</span>
								</StyledNavLink>
							</NavItem>
						</NavList>
					</Nav>
				</Sidebar>
				<Content>
					<Outlet />
				</Content>
			</LayoutContainer>
		</UserRegistrationProvider>
	);
};

export default BaseLayoutLoggedArea;
