// src/components/mols/StatsCard/StatsCard.js
import React from 'react';
import Text from '../../atoms/Text/Text';
import Icon from '../../atoms/Icon/Icon';
import './StatsCard.css'; // Create StatsCard.css

const StatsCard = ({ title, value, percentageChange, iconName, iconBgColor }) => {
	const isPositive = percentageChange >= 0;

	return (
		<div className="stats-card">
			<div className="card-header">
				<Text variant="body" className="card-title">{title}</Text>
				<div className="icon-wrapper" style={{ backgroundColor: iconBgColor || 'var(--light-purple)' }}>
					<Icon name={iconName} size="large" className="card-icon" />
				</div>
			</div>
			<div className="card-body">
				<Text variant="h2" className="card-value">{value}</Text>
				{percentageChange !== undefined && (
					<Text variant="small" className={`percentage-change ${isPositive ? 'positive' : 'negative'}`}>
						{isPositive ? '↑' : '↓'} {Math.abs(percentageChange)}% from last month
					</Text>
				)}
			</div>
		</div>
	);
};

export default StatsCard;