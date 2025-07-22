// src/components/atoms/Checkbox/Checkbox.js
import React from 'react';
import './Checkbox.css'; // Create Checkbox.css

const Checkbox = ({ id, checked, onChange, className = '', ...props }) => {
	return (
		<input
			type="checkbox"
			id={id}
			checked={checked}
			onChange={onChange}
			className={`checkbox ${className}`}
			{...props}
		/>
	);
};

export default Checkbox;