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

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
	const handlePrevious = useCallback(() => (currentPage > 1) && setCurrentPage(prev => prev - 1), [currentPage, setCurrentPage]);
	const handleNext = useCallback(() => (currentPage < totalPages) && setCurrentPage(prev => prev + 1), [currentPage, totalPages, setCurrentPage]);
	
	return (
		<PaginationWrapper>
			<span>Página {currentPage} de {totalPages}</span>
			<Button onClick={handlePrevious} disabled={currentPage === 1} size="small">
				Anterior
			</Button>
			<Button onClick={handleNext} disabled={currentPage === totalPages} size="small">
				Próximo
			</Button>
		</PaginationWrapper>
	);
};

export default Pagination;