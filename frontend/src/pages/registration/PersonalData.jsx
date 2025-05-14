import React from 'react'
import { Typography } from "../../components/Typography/Typography";
import { TextField } from "../../components/TextField/TextField";
import { Col, Row } from "react-grid-system";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useUserRegistrationContext } from "../../context/UserRegistration";

const PersonalData = () => {
	const {
		user,
		setFullName,
		setEmail,
		setPassword,
		setConfirmedPassword,
		submitUser,
	} = useUserRegistrationContext();

	const completeRegistration = (event) => {
		event.preventDefault();
		submitUser();
	};

	return (
		<form onSubmit={completeRegistration}>
			<div style={{ textAlign: "center" }}>
				<Typography variant="h1" component="h1">
					Create your account
				</Typography>
			</div>
			<Row>
				<Col>
					<TextField
						title="Full Name"
						value={user.fullName}
						onChange={setFullName}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<TextField
						title="Email"
						value={user.email}
						onChange={setEmail}
						type="email"
					/>
				</Col>
			</Row>
			<Row>
				<Col lg={6} md={6} sm={6}>
					<TextField
						title="Password"
						value={user.password}
						onChange={setPassword}
						type="password"
					/>
				</Col>
				<Col lg={6} md={6} sm={6}>
					<TextField
						title="Repeat Password"
						value={user.confirmedPassword}
						onChange={setConfirmedPassword}
						type="password"
					/>
				</Col>
			</Row>
			<Row>
				<Col lg={6} md={6} sm={6}>
					<Link to="/">
						<Button variant="secondary">
							Previous
						</Button>
					</Link>
				</Col>
				<Col lg={6} md={6} sm={6}>
					<div style={{ textAlign: "right" }}>
						<Button type="submit">
							Next
						</Button>
					</div>
				</Col>
			</Row>
		</form>
	);
};

export default PersonalData;