// src/components/atoms/Button/Button.js
import React from 'react';
import './Button.css'; // Create Button.css

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`button ${variant} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;