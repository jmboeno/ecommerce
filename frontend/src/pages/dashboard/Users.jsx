import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

const Users = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/users"}
				defaultSort={{ name: "ASC" }}
				placeholder={"Buscar por Usuário"}
				mapping={[
					{ field: "name", title: "Nome" },
					{ field: "email", title: "Email" },
					{ field: "phone", title: "Telefone" },
					{ field: "active", title: "Ativo", type: "boolean"},
					{ field: "user_roles", title: "Cargo", type: "list"},
					{ field: "user_permissions", title: "Permissões", type: "list", listField: "name"},
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Users;