// src/components/atoms/GlobalLoadingIndicator/GlobalLoadingIndicator.js
import React, { useContext } from 'react';
import { LoadingContext } from '../../../context/LoadingContext';
import './GlobalLoadingIndicator.css'; // Create GlobalLoadingIndicator.css

const GlobalLoadingIndicator = () => {
	const { isLoading } = useContext(LoadingContext);

	if (!isLoading) return null;

	return (
		<div className="global-loading-overlay">
			<div className="spinner"></div>
		</div>
	);
};

export default GlobalLoadingIndicator;