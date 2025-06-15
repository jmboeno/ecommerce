import React from "react";
import styled from "@emotion/styled";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContainer = styled.div`
	background-color: #fff;
	padding: 20px;
	border-radius: 8px;
	min-width: 400px;
	max-width: 90%;
	max-height: 80vh;
	overflow-y: auto;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	position: relative;
`;

const Header = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 20px;
	background: none;
	border: none;
	font-size: 18px;
	cursor: pointer;
`;

const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<Overlay onClick={onClose}>
			<ModalContainer onClick={(e) => e.stopPropagation()}>
				<CloseButton onClick={onClose}>×</CloseButton>
				{title && <Header>{title}</Header>}
				{children}
			</ModalContainer>
		</Overlay>
	);
};

export default Modal;