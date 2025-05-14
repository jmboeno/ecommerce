import styled from "@emotion/styled";

export const StyledDropdownItem = styled.li`
	padding: ${props => props.theme.spacing.xs} 0;
	text-align: center;
	border-bottom: 1px solid ${props => props.theme.colors.neutral.c};
	cursor: pointer;
	&:last-child {
		border: none;
	}
	color: ${props => props.isActive ? props.theme.colors.focus : 'inherit'};
	&:hover {
		color: ${props => props.theme.colors.focus};
	}
`;
