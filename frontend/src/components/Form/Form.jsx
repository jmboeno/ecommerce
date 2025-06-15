import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

const FormGroup = styled.div`
	margin-bottom: 15px;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
	color: #333;
`;

const RequiredIndicator = styled.span`
	color: red;
	margin-left: 5px;
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 0.85em;
	margin-top: 5px;
`;

const ButtonContainer = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`;

const Form = ({
	initialData = {},
	mapping,
	fields = [],
	onSubmit,
	onCancel,
	submitButtonText = "Salvar",
	cancelButtonText = "Cancelar",
	showButtons = true,
}) => {
	const [formData, setFormData] = useState(initialData);

	const filteredMapping = fields.length
		? mapping.filter((item) => fields.includes(item.field))
		: mapping;

	const handleChange = (field) => (e) => {
		setFormData((prev) => ({ ...prev, [field]: e.target?.value || e}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			{filteredMapping.map(({ component : Component, field, title, required, type, props }) => (
				<FormGroup key={field}>
					<Label htmlFor={field}>
						{title}
						{required && <RequiredIndicator>*</RequiredIndicator>}
					</Label>
					{Component ? (
						<Component
							value={formData[field]}
							onChange={handleChange(field)}
							{...props}
						/>
					) : (
						<Input
							id={field}
							type={type || "text"}
							value={formData[field] }
							onChange={handleChange(field)}
							placeholder={"Pesquisar"}
							required={required || false}
						/>
					)}
				</FormGroup>
			))}

			{showButtons && (
				<ButtonContainer>
					{onCancel && (
						<Button variant="secondary" onClick={onCancel} type="button">
							{cancelButtonText}
						</Button>
					)}
					<Button type="submit">{submitButtonText}</Button>
				</ButtonContainer>
			)}
		</form>
	);
};

export default Form;
