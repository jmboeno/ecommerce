import React from "react";

export const getFieldValueByType = (value, { type, listField }) => {
	if (!type) return value

	if (type === "date") return new Date(value).toLocaleString().split(",").join(" -")

	if (type === "boolean") return value ? "Sim" : "Não"

	if (type === "list") {
		return value?.length && listField
			? value.map(item => item[listField]).join(", ")
			: <i>Não preenchido</i>
	}

	return value
}

export const filteredMapping = (mapping, fields) => mapping.filter(({field}) => fields.includes(field));