import React from "react";
import styled from "@emotion/styled";
import { Button } from "../Button/Button";

const Backdrop = styled.div`
	position: fixed;
	top: 0; left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContainer = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	width: 400px;
	max-height: 80vh;
	overflow-y: auto;
`;

const Title = styled.h2`
	margin-top: 0;
`;

const ItemList = styled.ul`
	list-style: none;
	padding-left: 0;
	max-height: 200px;
	overflow-y: auto;
`;

const Item = styled.li`
	padding: 4px 0;
`;

const Actions = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`;


const ConfirmModal = ({ isOpen, onClose, onConfirm, selectedItems, data, setAlertMessage }) => {
	if (!isOpen) return null;

	return (
		<Backdrop>
			<ModalContainer>
				<Title>Tem certeza que deseja excluir os seguintes registros?</Title>
				<ItemList>
					{selectedItems.map((id) => {
						const fullItemInfo = data.find(item => item.id === id);

						return <Item key={id}>{setAlertMessage(fullItemInfo)}</Item>;
					})}
				</ItemList>
				<Actions>
					<Button onClick={onClose}>Cancelar</Button>
					<Button variant="danger" onClick={onConfirm}>Excluir</Button>
				</Actions>
			</ModalContainer>
		</Backdrop>
	);
};

export default ConfirmModal;
