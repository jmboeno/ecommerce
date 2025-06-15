import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../../Button/Button";

const PaginationWrapper = styled.div`
	width: 100%;
	margin-top: 20px;
	border-radius: 8px;
	display: flex;
	justify-content: end;
	gap: 8px;
	align-items: center;
`;

const Pagination = ({ handlePaginationPrevious, handlePaginationNext, currentPage, totalPages }) => {
	return (
		<PaginationWrapper>
			<span>Página {currentPage} de {totalPages}</span>
			<Button onClick={handlePaginationPrevious} disabled={currentPage === 1} size="small">
				Anterior
			</Button>
			<Button onClick={handlePaginationNext} disabled={currentPage === totalPages} size="small">
				Próximo
			</Button>
		</PaginationWrapper>
	);
};

export default Pagination;