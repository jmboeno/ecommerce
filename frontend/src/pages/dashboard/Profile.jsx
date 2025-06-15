import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled";
import { Row, Container, Col } from "react-grid-system";
import { Card } from "../../components/Card/Card";
import { Typography } from "../../components/Typography/Typography";
import background from './assets/profile-bg.png'
import avatar from './assets/avatar.png'
import { TextField } from "../../components/TextField/TextField";
import { Button } from "../../components/Button/Button";
import http from "../../http";
import { toast } from "react-toastify"
import DetroitLoading from '../../components/Loading/DetroitLoading';

const StyledTitle = styled.h1`
	background: url(${background}) no-repeat;
	margin-top: 0;
	font-weight: 600;
	font-size: 40px;
	background-position: center;
	line-height: 246px;
	text-align: center;
`

const StyledImg = styled.img`
	max-width: 100%;
	margin: 0 auto;
`

const LoadingWrapper = styled.div`
	text-align: center;
	margin: 40px 0;
	font-size: 18px;
	font-weight: 500;
`

const Profile = () => {
	const [formData, setFormData] = useState({
		id: "",
		name: "",
		phone: "",
		email: "",
	})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProfile = http.get("dashboard/profile")
			.then(response => {
				const data = response.data
				setFormData({
					id: data.id,
					name: data.name,
					phone: data.phone,
					email: data.email,
				})
			})
			.catch(error => console.error(error))

		const delay = new Promise(resolve => setTimeout(resolve, 1000))

		Promise.all([fetchProfile, delay])
			.finally(() => setLoading(false))
	}, [])

	const handleFormSubmit = (event) => {
		event.preventDefault()

		const { id, ...body } = formData;
		if (!id) {
			console.error("ID do perfil não está disponível.")
			toast.error("Não foi possível identificar o perfil.")
			return
		}

		http.patch(`dashboard/profile/${id}`, body)
			.then(() => toast.success("Perfil atualizado com sucesso!"))
			.catch(error => {
				console.error("Erro ao atualizar perfil", error)
				toast.error("Erro ao atualizar perfil. Tente novamente.")
			})
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	if (loading) {
		return <DetroitLoading />;
	}

	return (
		<>
			<Container>
				<form onSubmit={handleFormSubmit}>
					<Row>
						<Col sm={12} md={5}>
							<Card>
								<div style={{ textAlign: 'center' }}>
									<Typography component='h3' variant='h3'>
										Full Name
									</Typography>
									<StyledImg src={avatar} />
								</div>
							</Card>
						</Col>
						<Col sm={12} md={7}>
							<Typography component='h3' variant='h3'>
								Review your data
							</Typography>
							<TextField
								label="Nome"
								name="name"
								value={formData.name}
								onChange={handleChange}
							/>
							<Row>
								<Col sm={12} md={6}>
									<TextField
										label="Telefone"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
									/>
								</Col>
								<Col sm={12} md={6}>
									<TextField
										label="Email"
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
									/>
								</Col>
								<Col sm={12} md={6}>
									<Button fluid>
										Save
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</form>
			</Container>
		</>
	)
}

export default Profile