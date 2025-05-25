import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

const Plans = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/plans"}
				defaultSort={{ name: "ASC" }}
				placeholder={"Buscar por Plano"}
				mapping={[
					{ field: "name", title: "Nome" },
					{ field: "price", title: "Preço" },
					{ field: "duration_days", title: "Duração" },
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Plans;