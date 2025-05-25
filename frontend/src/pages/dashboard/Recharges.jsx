import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

const Recharges = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/recharges"}
				defaultSort={{ "plan.name": "ASC" }}
				placeholder={"Buscar por Plano"}
				mapping={[
					{ field: "plan.name", title: "Plano" },
					{ field: "smart_card_number", title: "Smart Card" },
					{ field: "status", title: "Status" },
					{ field: "user.name", title: "Usuário" },
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Recharges;
