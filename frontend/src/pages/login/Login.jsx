import React from 'react'
import styled from "@emotion/styled"
import { useState } from "react"
import { Col, Container, Row } from "react-grid-system"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { TextField } from "../../components/TextField/TextField"
import { Card } from "../../components/Card/Card"
import { Typography } from "../../components/Typography/Typography"
import { Logo } from "./Logo"
import { useUserSessionContext } from "../../context/UserSession"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const StyledForm = styled.form`
	border-bottom: 1px solid;
	border-color: ${props => props.theme.colors.primary.a};
	padding-bottom: ${props => props.theme.spacings.l};
`

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { login } = useUserSessionContext()
	const navigate = useNavigate()

	const handleLogin = async(event) => {
		event.preventDefault()

		login(email, password)
			.then(() => navigate("/dashboard/profile"))
			.catch(() =>toast.error("Login failed. Please check your credentials."))
	}

	return (
		<Container>
			<Row justify="center">
				<Col xxx={6} xxl={6} xl={6} lg={6} md={8} sm={12} style={{ margin: "80px 0" }}>
					<div style={{ textAlign: "center" }}>
						<Logo />
					</div>
					<Card>
						<div style={{ textAlign: "center" }}>
							<Typography variant="h1" component="h1">
								Log in
							</Typography>
						</div>
						<StyledForm onSubmit={handleLogin}>
							<TextField
								label="Email"
								value={email}
								onChange={setEmail}
								type="email"
							/>
							<TextField
								label="Password"
								value={password}
								onChange={setPassword}
								type="password"
							/>
							<div style={{ textAlign: "right" }}>
								<RouterLink to="">
									<Typography component="caption" variant="caption">
										Forgot your password?
									</Typography>
								</RouterLink>
							</div>
							<div style={{ textAlign: "center" }}>
								<Button>
									Login
								</Button>
							</div>
						</StyledForm>
						<div style={{ textAlign: "center" }}>
							<Typography component="caption" variant="caption">
								Haven’t created your Freelando account yet?
							</Typography>
						</div>
						<div style={{ textAlign: "center" }}>
							<RouterLink to="/registration">
								Register by clicking here!
							</RouterLink>
						</div>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Login