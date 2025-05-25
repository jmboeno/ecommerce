import React from 'react'
import { Container } from "react-grid-system";
import TablePresentation from '../../components/Table/Table'

const Payments = () => {
	return (
		<Container fluid>
			<TablePresentation
				route={"dashboard/payments"}
				defaultSort={{ payment_method: "ASC" }}
				placeholder={"Buscar por Pagamento"}
				mapping={[
					{ field: "payment_method", title: "Método de pagamento" },
					{ field: "amount", title: "Valor" },
					{ field: "status", title: "Status" },
					{ field: "createdAt", title: "Criado em", type: "date"},
				]}
			/>
		</Container>
	)
}

export default Payments;