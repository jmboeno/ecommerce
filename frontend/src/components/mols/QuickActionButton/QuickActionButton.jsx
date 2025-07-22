// src/components/mols/QuickActionButton/QuickActionButton.js
import React from 'react';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import './QuickActionButton.css'; // Create QuickActionButton.css

const QuickActionButton = ({ iconName, label, onClick, bgColor }) => {
	return (
		<Button onClick={onClick} className="quick-action-button" style={{ backgroundColor: bgColor }}>
			<Icon name={iconName} size="xl" />
			<Text variant="body" className="button-label">{label}</Text>
		</Button>
	);
};

export default QuickActionButton;