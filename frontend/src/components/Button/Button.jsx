import React from 'react'
import styled from "@emotion/styled";

const PrimaryStyledButton = styled.button`
	background: ${props => props.theme.colors.primary.b};
	color: ${props => props.theme.colors.white};
	border-radius: ${props => props.theme.spacings.s};
	padding: ${props => props.theme.spacings.xs} ${props => props.theme.spacings.s};
	box-sizing: border-box;
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
	text-align: center;
	cursor: pointer;
	border: none;
	&:hover {
		background: ${props => props.theme.colors.dark.b};
	}
	&:focus {
		outline-color: ${props => props.theme.colors.dark.d};
	}
`;

const SecondaryStyledButton = styled.button`
	background: transparent;
	color: ${props => props.theme.colors.primary.b};
	border: 2px solid ${props => props.theme.colors.primary.b};
	border-radius: ${props => props.theme.spacings.s};
	padding: ${props => props.theme.spacings.xs} ${props => props.theme.spacings.s};
	box-sizing: border-box;
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
	text-align: center;
	cursor: pointer;
	&:hover {
		border-color: ${props => props.theme.colors.dark.b};
		color: ${props => props.theme.colors.dark.b};
	}
	&:focus {
		outline-color: ${props => props.theme.colors.focus};
	}
`;

export const Button = ({ children, variant = "primary", ...props }) => {
	if (variant === "primary") {
		return (
			<PrimaryStyledButton {...props}>
				{children}
			</PrimaryStyledButton>
		);
	}
	return (
		<SecondaryStyledButton {...props}>
			{children}
		</SecondaryStyledButton>
	);
};
