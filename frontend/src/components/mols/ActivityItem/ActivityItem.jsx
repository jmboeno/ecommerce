// src/components/mols/ActivityItem/ActivityItem.js
import React from 'react';
import Text from '../../atoms/Text/Text';
import Icon from '../../atoms/Icon/Icon';
import './ActivityItem.css'; // Create ActivityItem.css

const ActivityItem = ({ iconName, text, timeAgo, iconBgColor }) => {
	return (
		<div className="activity-item">
			<div className="activity-icon-wrapper" style={{ backgroundColor: iconBgColor || 'var(--light-purple)' }}>
				<Icon name={iconName} size="small" className="activity-icon" />
			</div>
			<div className="activity-content">
				<Text variant="body" className="activity-text">{text}</Text>
				<Text variant="small" className="activity-time">{timeAgo}</Text>
			</div>
		</div>
	);
};

export default ActivityItem;