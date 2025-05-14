import React from 'react'
import { Col, Row } from "react-grid-system"
import { Typography } from "../../components/Typography/Typography"
import { Link } from "../../components/Link/Link"
import { Link as RouterLink } from 'react-router-dom'
import client from './assets/client.png'
import freelancer from './assets/freela.png'
import { useUserRegistrationContext } from "../../context/UserRegistrationContext"

const ClientSelection = () => {

	const { setProfile } = useUserRegistrationContext()

	return (<div style={{ textAlign: 'center' }}>
		<Typography variant="h1" component="h1">
			Create your registration
		</Typography>
		<Typography variant='h3' component='h2'>
			How can we help you?
		</Typography>
		<Row>
			<Col md={6} sm={12}>
				<RouterLink to='interests' onClick={() => setProfile('client')}>
					<img src={client} alt="" />
					<Typography variant="body" component="body">
						I am a client and need a freelancer!
					</Typography>
				</RouterLink>
			</Col>
			<Col md={6} sm={12}>
				<img src={freelancer} alt="" />
				<Typography variant="body" component="body">
					I am a freelancer and need clients!
				</Typography>
			</Col>
		</Row>
		<div>
			<Typography variant="body2" component="body2">
				Already have an account?
			</Typography>
			<p>
				<Link variant="secondary">Log in!</Link>
			</p>
		</div>
	</div>)
}

export default ClientSelection