import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../services/usersService";
import { getRecharges } from "../services/rechargesService";
import { getPayments } from "../services/paymentsService";

const AppContainer = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100vh - 100px);
	display: flex;
`;

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const [recharges, setRecharges] = useState([]);
	const [payments, setPayments] = useState([]);

	const fetchData = useCallback(
		async(getData, setData) => {
			try {
				const data = await getData();

				setData(data);
			} catch (e) {
				console.error(e);
			}
		}
	, []);

	useEffect(() => {
		const fetch = async () => {
			await fetchData(getUsers, setUsers);
			await fetchData(getRecharges, setRecharges);
			await fetchData(getPayments, setPayments);
		};
	
		fetch();
	}, [fetchData]);

	console.log(users);
	console.log(recharges);
	console.log(payments);

	return (
		<AppContainer>
		</AppContainer>
	);
}

export default Dashboard;