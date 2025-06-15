import React from "react";
import Modal from "./Modal";
import Form from "../Form/Form";
import { filteredMapping } from "../Table/helpers/typesHelper";

const CreateModal = ({ isOpen, onClose, onSubmit, mapping, fields, title, data, selectedItems }) => {
	const filterMapping = fields.length ? filteredMapping(mapping, fields) : mapping;
	const formData = data?.filter(({ id }) => selectedItems.includes(id))[0];

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title} >
			<Form mapping={filterMapping} onSubmit={onSubmit} onCancel={onClose} initialData={formData} />
		</Modal>
	);
};

export default CreateModal;