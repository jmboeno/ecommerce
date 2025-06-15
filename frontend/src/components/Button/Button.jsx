import React from "react";
import styled from "@emotion/styled";

const VARIANT_STYLES = (theme, variant) => {
	switch (variant) {
	case "primary":
		return {
			background: theme.colors.primary.a,
			color: theme.colors.white,
			hoverBg: theme.colors.primary.b,
		};
	case "success":
		return {
			background: theme.colors.success.a,
			color: theme.colors.white,
			hoverBg: theme.colors.success.b,
		};
	case "danger":
		return {
			background: theme.colors.danger.a,
			color: theme.colors.white,
			hoverBg: theme.colors.danger.b,
		};
	case "warning":
		return {
			background: theme.colors.warning.a,
			color: theme.colors.white,
			hoverBg: theme.colors.warning.b,
		};
	default:
		return {
			background: theme.colors.default.a,
			color: theme.colors.dark.b,
			border: `2px solid ${theme.colors.dark.b}`,
			hoverColor: theme.colors.dark.b,
		};
	}
};

const SIZE_STYLES = (theme, size) => {
	switch (size) {
	case "small":
		return {
			padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
			fontSize: "12px",
		};
	case "large":
		return {
			padding: `${theme.spacings.s} ${theme.spacings.m}`,
			fontSize: "18px",
		};
	case "medium":
	default:
		return {
			padding: `${theme.spacings.xs} ${theme.spacings.s}`,
			fontSize: "16px",
		};
	}
};

const StyledButton = styled.button`
	${({ theme, variant, size }) => {
		const variantStyles = VARIANT_STYLES(theme, variant);
		const sizeStyles = SIZE_STYLES(theme, size);

		return `
			background: ${variantStyles.background};
			color: ${variantStyles.color};
			${variantStyles.border ? `border: ${variantStyles.border};` : "border: none;"}
			border-radius: ${theme.spacings.s};
			padding: ${sizeStyles.padding};
			font-size: ${sizeStyles.fontSize};
			font-weight: 700;
			line-height: 20px;
			text-align: center;
			cursor: pointer;
			box-sizing: border-box;
			transition: all 0.2s ease;

			&:hover {
				${variantStyles.hoverBg ? `background: ${variantStyles.hoverBg};` : ""}
				${variantStyles.hoverColor ? `color: ${variantStyles.hoverColor}; border-color: ${variantStyles.hoverColor};` : ""}
			}

			&:focus {
				outline-color: ${theme.colors.focus};
			}

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
				pointer-events: none;
			}
		`;
	}}
`;

export const Button = ({
	children,
	variant = "default",
	size = "medium",
	...props
}) => {
	return (
		<StyledButton variant={variant} size={size} {...props}>
			{children}
		</StyledButton>
	);
};
