import styled from "@emotion/styled";

export const TableBody = styled.tbody`
	color: ${({ theme }) => theme.colors.font};
`;

export const TableBodyCell = styled.td`
	padding: 14px 16px;
	text-align: left;
	font-size: 14px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.opacity.a};
`;

export const TableBodyRow = styled.tr`
	background-color: ${({ theme, selected }) => selected ? theme.colors.opacity.a : "inherit"};
	transition: background-color 0.3s ease;
	cursor: ${({ hoverable }) => (hoverable ? "pointer" : "default")};

	&:hover {
		background-color: ${({ theme, hoverable }) => hoverable ? theme.colors.opacity.a : "inherit"};
	}
`;