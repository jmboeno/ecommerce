import React from 'react'
import styled from "@emotion/styled";

const StyledLabel = styled.label`
	display: block;
	width: 100%;
	box-sizing: border-box;
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;
`;

const StyledInput = styled.input`
	display: block;
	width: 100%;
	box-sizing: border-box;
	margin-top: ${props => props.theme.spacings.xs};
	margin-bottom: ${props => props.theme.spacings.s};
	background: ${props => props.theme.colors.white};
	border: 1px solid;
	border-color: ${props => props.theme.colors.neutral.a};
	border-radius: ${props => props.theme.spacings.s};
	padding: 0 ${props => props.theme.spacings.s};
	height: 40px;
	font-weight: 400;
	font-size: 14px;
	line-height: 17px;
`;

export const TextField = ({ title, value, onChange, type = 'text' }) => {
	return (
		<StyledLabel>
			{title}
			<StyledInput 
				value={value} 
				onChange={event => onChange(event.target.value)}
				type={type}
			/>
		</StyledLabel>
	);
};
