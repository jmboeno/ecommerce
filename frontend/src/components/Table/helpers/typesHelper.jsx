import React from "react";

export const getFieldValueByType = (value, type) => {
	if (!value || !value.length) return <i>Não preenchido</i>;

	if (!type) return value;

	if (type === "list") return value.length > 1 ? value.concat(", ") : value[0];

	if (type === "date") return new Date(value).toLocaleString().split(",").join(" -");

	if (type === "boolean") return value ? "Sim" : "Não";

	if (type === "money") return `R$ ${value.replace(".", ",")}`;

	return value;
}

export const filteredMapping = (mapping, fields) => mapping.filter(({field}) => fields.includes(field));