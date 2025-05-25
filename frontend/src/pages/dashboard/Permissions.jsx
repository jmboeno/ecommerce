import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

const Permissions = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/permissions"}
				defaultSort={{ name: "ASC" }}
				placeholder={"Buscar por Permissão"}
				mapping={[
					{ field: "name", title: "Nome", },
					{ field: "description", title: "Descrição" },
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Permissions;