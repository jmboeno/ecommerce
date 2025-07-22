// src/components/atoms/Text/Text.js
import React from 'react';
import './Text.css'; // Create Text.css

const Text = ({ children, variant = 'body', className = '', ...props }) => {
	const Tag = variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4' || variant === 'h5' || variant === 'h6'
		? variant
		: 'p';

	return (
		<Tag className={`text ${variant} ${className}`} {...props}>
			{children}
		</Tag>
	);
};

export default Text;