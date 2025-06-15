import React, { useCallback, useState } from "react";
import Toolbar from "./Toolbar/Toolbar";
import { createData, deleteData, updateData } from "./helpers/actionsHelper";
import CreateModal from "../Modal/CreateModal";
import { toast } from "react-toastify";
import ConfirmModal from "../Modal/ConfirmModal";
import TableContainer from "./Container/TableContainer";

const Table = ({ actions, mapping, selectionType }) => {
	const [data, setData] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [search, setSearch] = useState("");
	const [limit, setLimit] = useState(10);
	const [fetchTrigger, setFetchTrigger] = useState(0);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isUpdateOpen, setIsUpdateOpen] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const refresh = useCallback(() => setFetchTrigger(prev => prev + 1), []);

	const handleCreateModal = useCallback(() => setIsCreateOpen(true), []);
	const handleCloseCreateModal = useCallback(() => setIsCreateOpen(false), []);

	const handleCreate = useCallback(
		(formData) => createData({
			formData,
			actions,
			onSuccess: () => {
				toast.success("Registro criado com sucesso!");
				setIsCreateOpen(false);
				refresh();
			},
			onCancel: error => {
				console.error(error);
				toast.error("Erro ao criar registro.");
			}
		}), [actions, refresh]
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
				refresh();
			},
			onCancel: error => {
				console.error(error);
				toast.error("Erro ao atualizar registro.");
			}
		}), [actions, selectedItems, refresh]
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
				refresh();
			},
			onCancel: error => {
				toast.error("Erro ao deletar registros.");
				console.error(error);
				handleCloseDeleteClick();
			}
		}), [actions, selectedItems, refresh, handleCloseDeleteClick]
	);

	const toggleSelection = useCallback(
		(id) => setSelectedItems((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter(itemId => itemId !== id)
				: [...prevSelected, id]
		), []
	);

	return (
		<>
			<Toolbar
				search={search}
				setSearch={setSearch}
				setLimit={setLimit}
				setFetchTrigger={setFetchTrigger}
				onCreateClick={handleCreateModal}
				handleDelete={handleDeleteClick}
				actions={actions}
				enabledBulkActions={Boolean(selectedItems.length)}
			/>
			<TableContainer
				data={data}
				setData={setData}
				selectionType={selectionType}
				search={search}
				actions={actions}
				mapping={mapping}
				fetchTrigger={fetchTrigger}
				limit={limit}
				toggleSelection={toggleSelection}
				handleDelete={handleDeleteClick}
				handleUpdate={handleUpdateModal}
				selectedItems={selectedItems}
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
					title="Dados do registro"
					isOpen={isUpdateOpen}
					onClose={handleCloseUpdateModal}
					onSubmit={handleUpdate}
					mapping={mapping}
					selectedItems={selectedItems}
					data={data}
					fields={actions.UPDATE.fields}
				/>
			)}
			{actions.DELETE && (
				<ConfirmModal
					isOpen={isConfirmOpen}
					onClose={handleCloseDeleteClick}
					onConfirm={confirmDelete}
					selectedItems={selectedItems}
					data={data}
					setAlertMessage={actions.DELETE.setAlertMessage}
				/>
			)}
		</>
	);
};

export default Table;