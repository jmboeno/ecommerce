import React from 'react';
import { Container } from "react-grid-system";
import Zoom from '../../components/Fields/Zoom';
import Table from '../../components/Table/Table';

const mapping = [
	{
		field: "id",
		title: "Identificador"
	},
	{
		field: "plan_id",
		title: "Plano",
		component: Zoom,
		props: {
			route: "dashboard/plans",
			primaryKey: "id",
			valueField: "name"
		}
	},
	{
		field: "plan.name",
		title: "Plano"
	},
	{
		field: "smart_card_number",
		title: "Smart Card"
	},
	{
		field: "status",
		title: "Status"
	},
	{
		field: "user_id",
		title: "Usuário"
	},
	{
		field: "user.name",
		title: "Usuário"
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
		route: "dashboard/recharges",
		order: { "id": "ASC" },
		fields: ["id", "plan.name", "smart_card_number", "status", "user.name", "createdAt"]
	},
	CREATE: {
		method: "POST",
		route: "dashboard/recharges",
		fields: ["plan_id", "smart_card_number"]
	},
	UPDATE: {
		method: "PATCH",
		route: "dashboard/recharges",
		fields: ["plan_id", "smart_card_number", "status", "user.name"]
	},
	DELETE: {
		method: "DELETE",
		route: "dashboard/recharges",
		setAlertMessage: value => `${value.id} - ${value["plan.name"]}`
	}
}

const Recharges = () => {
	return (
		<Container fluid >
			<Table
				selectionType={"multi"}
				actions={actions}
				mapping={mapping}
			/>
		</Container>
	)
}

export default Recharges;
