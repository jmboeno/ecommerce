import React from 'react'
import styled from "@emotion/styled"
import { Col, Row } from "react-grid-system"
import { Link } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { Typography } from "../../components/Typography/Typography"

import conclusion from './assets/client-completed.png'

const StyledImage = styled.img`
    max-width: 100%;
    border-radius: 16px;
`

const Completed = () => {
	return (<>
		<div style={{ textAlign: 'center' }}>
			<Typography variant="h1" component="h1">
				Your profile is complete!
			</Typography>
			<Typography variant="h3" component="h3">
				Now just start connecting with the best freelancers in the market!
			</Typography>
		</div>
		<figure>
			<StyledImage src={conclusion} alt="" />
		</figure>
		<Row justify="center">
			<Col lg={6} md={6} sm={6} style={{ textAlign: 'center' }}>
				<Link to='/register'>
					<Button variant="secondary">
						Back to home
					</Button>
				</Link>
			</Col>
		</Row>
	</>)
}

export default Completed
