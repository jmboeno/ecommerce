import React, { useCallback, useEffect, useState } from "react";
import Toolbar from "./Toolbar/Toolbar";
import { createData, deleteData, fetchData, updateData } from "./helpers/actionsHelper";
import CreateModal from "../Modal/CreateModal";
import { toast } from "react-toastify";
import ConfirmModal from "../Modal/ConfirmModal";
import TableContainer from "./Container/TableContainer";

const Table = ({ actions, mapping, selectionType }) => {
	const [data, setData] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isUpdateOpen, setIsUpdateOpen] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const handleSearch = useCallback(() => {
		setLoading(true);
	
		fetchData({
			actions,
			limit,
			currentPage,
			search,
			onSuccess: ({ data }) => {
				setData(data.data);
				setTotalPages(Math.max(1, Math.ceil(data.total / limit)));
				setLoading(false);
			},
			onCancel: error => {
				console.error(error);
				toast.error("Erro ao carregar registros.");
				setLoading(false);
			}
		});
	}, [actions, limit, currentPage, search, setData]);

	const handleCreateModal = useCallback(() => setIsCreateOpen(true), []);
	const handleCloseCreateModal = useCallback(() => setIsCreateOpen(false), []);
	const handleCreate = useCallback(
		(formData) => createData({
			formData,
			actions,
			onSuccess: () => {
				toast.success("Registro criado com sucesso!");
				setIsCreateOpen(false);
			},
			onCancel: error => {
				console.error(error);
				toast.error("Erro ao criar registro.");
			}
		}), [actions]
	);

	const handleUpdateModal = useCallback(
		(id) => {
			id && setSelectedItems([id]);
			setIsUpdateOpen(true)
		}, []
	);
	const handleCloseUpdateModal = useCallback(() => setIsUpdateOpen(false), []);
	const handleUpdate = useCallback(
		(formData) => updateData({
			id: selectedItems[0],
			formData,
			actions,
			onSuccess: () => {
				toast.success("Registro atualizado com sucesso!");
				setIsUpdateOpen(false);
			},
			onCancel: error => {
				console.error(error);
				toast.error("Erro ao atualizar registro.");
			}
		}), [actions, selectedItems]
	);

	const handleDeleteClick = useCallback(
		(id) => {
			id && setSelectedItems([id]);
			setIsConfirmOpen(true)
		}, []
	);
	const handleCloseDeleteClick = useCallback(() => setIsConfirmOpen(false), []);
	const confirmDelete = useCallback(
		() => deleteData({
			selectedItems,
			actions,
			onSuccess: () => {
				toast.success("Registros excluídos com sucesso!");
				setSelectedItems([]);
				handleCloseDeleteClick();
			},
			onCancel: error => {
				toast.error("Erro ao deletar registros.");
				console.error(error);
				handleCloseDeleteClick();
			}
		}), [actions, selectedItems, handleCloseDeleteClick]
	);

	const toggleSelection = useCallback(
		(id) => setSelectedItems((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter(itemId => itemId !== id)
				: [...prevSelected, id]
		), []
	);

	const handlePaginationPrevious = useCallback(
		() => {
			setCurrentPage(currentPage - 1);
		}, [currentPage]
	);

	const handlePaginationNext = useCallback(
		() => {
			setCurrentPage(currentPage + 1);
		}, [currentPage]
	);

	useEffect(() => handleSearch(), [currentPage]);

	return (
		<>
			<Toolbar
				search={search}
				setSearch={setSearch}
				setLimit={setLimit}
				handleCreate={handleCreateModal}
				handleDelete={handleDeleteClick}
				handleSearch={handleSearch}
				actions={actions}
				enabledBulkActions={Boolean(selectedItems.length)}
			/>
			<TableContainer
				data={data}
				selectedItems={selectedItems}
				loading={loading}
				search={search}
				currentPage={currentPage}
				totalPages={totalPages}
				selectionType={selectionType}
				actions={actions}
				mapping={mapping}
				setData={setData}
				handlePaginationPrevious={handlePaginationPrevious}
				handlePaginationNext={handlePaginationNext}
				toggleSelection={toggleSelection}
				handleDelete={handleDeleteClick}
				handleUpdate={handleUpdateModal}
				handleSearch={handleSearch}
			/>
			{actions.CREATE && (
				<CreateModal
					title="Criar novo registro"
					isOpen={isCreateOpen}
					onClose={handleCloseCreateModal}
					onSubmit={handleCreate}
					mapping={mapping}
					fields={actions.CREATE.fields}
				/>
			)}
			{actions.UPDATE && (
				<CreateModal
					data={data}
					title="Dados do registro"
					isOpen={isUpdateOpen}
					onClose={handleCloseUpdateModal}
					onSubmit={handleUpdate}
					mapping={mapping}
					selectedItems={selectedItems}
					fields={actions.UPDATE.fields}
				/>
			)}
			{actions.DELETE && (
				<ConfirmModal
					data={data}
					isOpen={isConfirmOpen}
					onClose={handleCloseDeleteClick}
					onConfirm={confirmDelete}
					selectedItems={selectedItems}
					setAlertMessage={actions.DELETE.setAlertMessage}
				/>
			)}
		</>
	);
};

export default Table;