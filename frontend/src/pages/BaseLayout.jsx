import React from 'react'
import { Col, Container, Row } from "react-grid-system";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { FreelandoLogo } from "../components/Icons/FreelandoLogo";
import { Link } from "../components/Link/Link";

const BaseLayout = () => {
	return (
		<>
			<Header>
				<Container>
					<Row align="center">
						<Col>
							<FreelandoLogo />
						</Col>
						<Col style={{ textAlign: "right" }}>
							<Link>Login</Link>
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
