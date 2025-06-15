import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { TableHead, TableHeaderRow, TableHeaderCell } from "../Header/TableHead";
import { toast } from "react-toastify";
import { TableBody, TableBodyCell, TableBodyRow } from "../Body/TableBody";
import { fetchData } from "../helpers/actionsHelper";
import { filteredMapping, getFieldValueByType } from "../helpers/typesHelper";
import Pagination from "../Pagination/Pagination";
import { Button } from "../../Button/Button";

const TableWrapper = styled.div`
	width: 100%;
	margin-top: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	overflow: auto;
	max-height: calc(100vh - 240px);
`;

const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
`;

const LoadingWrapper = styled.div`
	text-align: center;
	margin: 40px 0;
	font-size: 18px;
	font-weight: 500;
`;

const TableBodyRowWrapper = styled(TableBodyRow)`
	&:hover .action-buttons {
		opacity: 1;
		visibility: visible;
	}
`;

const ActionButtonsWrapper = styled.div`
	display: flex;
	gap: 8px;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.2s ease;
`;

const ActionCell = styled(TableBodyCell)`
	white-space: nowrap;
	width: 80px;
`;

const TableContainer = ({
	data,
	loading,
	actions,
	mapping,
	currentPage,
	totalPages,
	selectionType,
	selectedItems,
	toggleSelection,
	handleDelete,
	handleUpdate,
	handlePaginationPrevious,
	handlePaginationNext
}) => {
	if (!actions?.READ) {
		throw new Error("A ação READ é obrigatória");
	}

	const filterFields = actions.READ.fields;
	const filterMapping = filterFields ? filteredMapping(mapping, filterFields) : mapping;

	const handleRowClick = (id) => toggleSelection(id, { exclusive: true });

	if (loading) {
		return <LoadingWrapper>Carregando...</LoadingWrapper>;
	}

	return (
		<>
			<TableWrapper>
				<Table>
					<TableHead>
						<TableHeaderRow>
							{ selectionType === "multi" && <TableHeaderCell key={"selection_multi"} /> }
							{filterMapping.map(({ title }) => (
								<TableHeaderCell key={title}>{title}</TableHeaderCell>
							))}
							<TableHeaderCell key={"actions"}>Ações</TableHeaderCell>
						</TableHeaderRow>
					</TableHead>
					<TableBody>
						{data.map((item) => (
							<TableBodyRowWrapper
								key={item.id}
								hoverable
								selected={selectedItems.includes(item.id)}
								onClick={() => handleRowClick(item.id)}
							>
								{ selectionType === "multi" && (
									<TableHeaderCell key={`selection_multi_${item.id}`} >
										<input
											type="checkbox"
											checked={selectedItems.includes(item.id)}
											onChange={() => toggleSelection(item.id)}
											onClick={(e) => e.stopPropagation()}
											aria-label={`Selecionar item ${item.id}`}
										/>
									</TableHeaderCell>
								) }
								{ filterMapping.map(({ field, ...otherProps }) => (
									<TableBodyCell key={`${item.id}_${field}`}>
										{ getFieldValueByType(item[field], otherProps) }
									</TableBodyCell>
								)) }
								<ActionCell key={`actions_${item.id}`}>
									<ActionButtonsWrapper className="action-buttons">
										<Button size="small" variant="primary" onClick={() => handleUpdate(item.id)}>Editar</Button>
										<Button size="small" variant="danger" onClick={() => handleDelete(item.id)}>Excluir</Button>
									</ActionButtonsWrapper>
								</ActionCell>
							</TableBodyRowWrapper>
						))}
					</TableBody>
				</Table>
			</TableWrapper>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				handlePaginationPrevious={handlePaginationPrevious}
				handlePaginationNext={handlePaginationNext}
			/>
		</>
	);
};

export default TableContainer;