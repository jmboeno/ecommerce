import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

const Providers = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/providers"}
				defaultSort={{ name: "ASC" }}
				placeholder={"Buscar por Provedor"}
				mapping={[
					{ field: "name", title: "Nome" },
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Providers;