// src/components/mols/FormField/FormField.js
import React from 'react';
import Input from '../../atoms/Input/Input';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import './FormField.css'; // Create FormField.css

const FormField = ({ label, type, placeholder, value, onChange, iconName, error, onIconClick, iconClickable = false, ...props }) => {
	return (
		<div className={`form-field ${error ? 'error' : ''}`}>
			{label && <label htmlFor={props.id || ''}><Text variant="small" className="form-field-label">{label}</Text></label>}
			<div className="input-wrapper">
				{iconName && (
					<Icon
						name={iconName}
						className={`input-icon ${iconClickable ? 'clickable' : ''}`}
						onClick={iconClickable ? onIconClick : undefined}
					/>
				)}
				<Input
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className={iconName ? 'with-icon' : ''}
					{...props}
				/>
			</div>
			{error && <Text variant="small" className="error-message">{error}</Text>}
		</div>
	);
};

export default FormField;