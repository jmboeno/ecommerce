import styled from "styled-components";

export const CenterContent = styled.div`
	padding: 20px;
	background: #f9f9f9;
	display: flex;
	flex-direction: column;
	width: 100%;
	${(props) =>
		props.centered &&
		`
		align-items: center;
		justify-content: center;
	`}
`;