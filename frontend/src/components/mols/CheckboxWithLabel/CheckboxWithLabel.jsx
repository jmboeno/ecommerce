// src/components/mols/CheckboxWithLabel/CheckboxWithLabel.js
import React from 'react';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import Text from '../../atoms/Text/Text';
import './CheckboxWithLabel.css'; // Create CheckboxWithLabel.css

const CheckboxWithLabel = ({ id, label, checked, onChange, className = '', ...props }) => {
	return (
		<div className={`checkbox-with-label ${className}`}>
			<Checkbox id={id} checked={checked} onChange={onChange} {...props} />
			{label && <label htmlFor={id} className="checkbox-label"><Text variant="small">{label}</Text></label>}
		</div>
	);
};

export default CheckboxWithLabel;