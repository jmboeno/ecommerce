import React, { useState } from "react";
import { NavLink as RouterNavLink, Outlet } from "react-router-dom";
import { UserRegistrationProvider } from "../../context/UserRegistration";
import { FaUser, FaUsers, FaUserShield } from "react-icons/fa";
import { MdAddCard, MdViewList, MdBusiness, MdSecurity, MdPayments } from "react-icons/md";
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
  top: 5px;
  right: -15px;
  background: ${({ theme }) => theme.colors.primary.a};
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
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

const StyledNavLink = styled(RouterNavLink, {
	shouldForwardProp: (prop) => prop !== "collapsed"
})`
	color: white;
	text-decoration: none;
	padding: 10px 20px;
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
		margin-right: ${props => (props.collapsed ? "0" : "30px")};
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

const BaseLayoutDashboard = () => {
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
								<StyledNavLink to="/dashboard/profile" title="Perfil" collapsed={collapsed}>
									<FaUser />
									<span>Perfil</span>
								</StyledNavLink>
								<StyledNavLink to="/dashboard/users" title="Usuários" collapsed={collapsed}>
									<FaUsers />
									<span>Usuários</span>
								</StyledNavLink>
								<StyledNavLink to="/dashboard/roles" title="Cargos" collapsed={collapsed}>
									<FaUserShield />
									<span>Cargos</span>
								</StyledNavLink>
								<StyledNavLink to="/dashboard/permissions" title="Permissões" collapsed={collapsed}>
									<MdSecurity />
									<span>Permissões</span>
								</StyledNavLink>
								<StyledNavLink to="/dashboard/recharges" title="Recharges" collapsed={collapsed}>
									<MdAddCard />
									<span>Recharges</span>
								</StyledNavLink>
								<StyledNavLink to="/dashboard/plans" title="Plans" collapsed={collapsed}>
									<MdViewList />
									<span>Plans</span>
								</StyledNavLink>
								<StyledNavLink to="/dashboard/providers" title="Provedores" collapsed={collapsed}>
									<MdBusiness />
									<span>Provedores</span>
								</StyledNavLink>
								<StyledNavLink to="/dashboard/payments" title="Pagamentos" collapsed={collapsed}>
									<MdPayments />
									<span>Pagamentos</span>
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

export default BaseLayoutDashboard;
