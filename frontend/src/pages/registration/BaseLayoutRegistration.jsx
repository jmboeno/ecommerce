import React from 'react'
import { Col, Row } from "react-grid-system";
import { Outlet } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { UserRegistrationProvider } from "../../context/UserRegistration";

const BaseLayoutRegistration = () => {
	return (
		<UserRegistrationProvider>
			<Row justify="center">
				<Col xxx={6} xxl={6} xl={6} lg={6} md={8} sm={12} style={{ margin: '80px 0' }}>
					<Card>
						<Outlet />
					</Card>
				</Col>
			</Row>
		</UserRegistrationProvider>
	);
}

export default BaseLayoutRegistration;
