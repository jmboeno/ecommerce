import React from 'react'
import styled from "@emotion/styled";

const StyledDiv = styled.div`
	padding: ${props => props.theme.spacings.l};
	background: ${props => props.theme.colors.secondary.a};
	border: 1px solid;
	border-color: ${props => props.theme.colors.primary.a};
	border-radius: ${props => props.theme.spacings.s};
`;

export const Card = ({ children }) => {
	return (
		<StyledDiv>
			{children}
		</StyledDiv>
	);
};
