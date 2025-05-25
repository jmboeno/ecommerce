import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { FreelandoLogo } from "../components/Icons/FreelandoLogo";
import { Link } from "../components/Link/Link";
import { useUserSessionContext } from "../context/UserSession";
import { useLocation } from "react-router-dom";

const BaseLayout = () => {
	const { isUserLoggedIn, logout } = useUserSessionContext();
	const location = useLocation();

	const isInProfile = location.pathname.startsWith("/dashboard");

	return (
		<>
			<Header>
				<Container fluid >
					<Row align="center">
						<Col>
							<FreelandoLogo />
						</Col>
						<Col style={{ textAlign: "right" }}>
							{isUserLoggedIn ? (
								<>
									{!isInProfile && (
										<span style={{ marginRight: "1rem" }}>
											<Link to="/dashboard/profile">Minha conta</Link>
										</span>
									)}
									<Link to="/" onClick={logout}>Logout</Link>
								</>
							) : (
								<>
									<span style={{ marginRight: "1rem" }}>
										<Link to="/registration">Cadastrar</Link>
									</span>
									<Link to="/login">Login</Link>
								</>
							)}
						</Col>
					</Row>
				</Container>
			</Header>
			<Container fluid style={{ padding: 0 }}>
				<Outlet />
			</Container>
		</>
	);
};

export default BaseLayout;
