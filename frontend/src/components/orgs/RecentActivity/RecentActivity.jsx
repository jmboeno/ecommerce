// src/components/orgs/RecentActivity/RecentActivity.js
import React from 'react';
import Text from '../../atoms/Text/Text';
import Button from '../../atoms/Button/Button';
import ActivityItem from '../../mols/ActivityItem/ActivityItem';
import './RecentActivity.css'; // Create RecentActivity.css

const RecentActivity = ({ activities }) => {
	return (
		<div className="recent-activity-card">
			<div className="card-header-with-action">
				<Text variant="h4">Recent Activity</Text>
				<Button variant="secondary" className="view-all-button">View All</Button>
			</div>
			<div className="activity-list">
				{activities.map((activity, index) => (
					<ActivityItem
						key={index}
						iconName={activity.icon}
						text={activity.text}
						timeAgo={activity.timeAgo}
						iconBgColor={activity.iconBgColor}
					/>
				))}
			</div>
		</div>
	);
};

export default RecentActivity;