import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table';
import Zoom from '../../components/Fields/Zoom';

const mapping = [
	{
		field: "id",
		title: "Identificador"
	},
	{
		field: "name",
		title: "Nome"
	},
	{
		field: "email",
		title: "Email"
	},
	{
		field: "phone",
		title: "Telefone"
	},
	{
		field: "active",
		title: "Ativo",
		type: "boolean"
	},
	{
		field: "user_roles_names",
		title: "Cargo",
		type: "list"
	},
	{
		field: "user_permissions_names",
		title: "Permissões",
		type: "list"
	},
	{
		field: "user_roles_ids",
		title: "Cargo",
		component: Zoom,
		props: {
			route: "dashboard/roles",
			primaryKey: "id",
			valueField: "name"
		}
	},
	{
		field: "user_permissions_ids",
		title: "Permissões",
		component: Zoom,
		props: {
			route: "dashboard/permissions",
			primaryKey: "id",
			valueField: "name"
		}
	},
	{
		field: "createdAt",
		title: "Criado em",
		type: "date"
	},
];

const actions = {
	READ: {
		method: "GET",
		route: "dashboard/users",
		order: { "id": "ASC" },
		fields: ["id", "name", "email","phone", "active", "user_roles_names", "user_permissions_names", "createdAt"]
	},
	CREATE: {
		method: "POST",
		route: "dashboard/users",
		fields: ["name", "email","phone", "active", "user_roles_ids", "user_permissions_ids",]
	},
	UPDATE: {
		method: "PATCH",
		route: "dashboard/users",
		fields: ["name", "email","phone", "active", "user_roles_ids", "user_permissions_ids",]
	},
	DELETE: {
		method: "DELETE",
		route: "dashboard/users",
		setAlertMessage: value => `${value.id} - ${value["name"]}`
	}
}

const Users = () => {
	return (
		<Container fluid>
			<TablePresentation
				selectionType={"multi"}
				actions={actions}
				mapping={mapping}
			/>
		</Container>
	)
}

export default Users;