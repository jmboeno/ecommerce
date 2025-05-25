import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

const Roles = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/roles"}
				defaultSort={{ name: "ASC" }}
				placeholder={"Buscar por Cargo"}
				mapping={[
					{ field: "name", title: "Nome" },
					{ field: "description", title: "Descrição" },
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Roles;