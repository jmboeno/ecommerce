import React from 'react'
import styled from "@emotion/styled";
import { Col, Container, Row } from "react-grid-system";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Typography } from "../../components/Typography/Typography";
import error404 from "./assets/error-404.png";

const StyledImage = styled.img`
	max-width: 100%;
`;

const Page404 = () => {
	return (
		<Container>
			<Row justify="center">
				<Col xxx={6} xxl={6} xl={6} lg={6} md={8} sm={12} style={{ marginTop: "48px" }}>
					<Card>
						<Typography variant="h1" component="h1">
							Oops... Page not found :(
						</Typography>
						<figure>
							<StyledImage src={error404} alt="Error 404" />
						</figure>
						<Typography variant="body" component="body">
							We couldnt find the page you were looking for, but we have plenty of others for you to explore!
						</Typography>
						<div style={{ textAlign: "center" }}>
							<Link to="/">
								<Button variant="secondary">
									Back to Home
								</Button>
							</Link>
						</div>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Page404;
