import styled from "@emotion/styled";

export const TableHead = styled.thead`
	background-color: ${({ theme }) => theme.colors.primary.a};
`;

export const TableHeaderCell = styled.th`
	padding: 14px 16px;
	text-align: left;
	color: white;
	font-weight: 600;
	font-size: 16px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.opacity.a};
`;

export const TableHeaderRow = styled.tr`
	background-color: ${({ color }) => color || "transparent"};
	cursor: default;
`;