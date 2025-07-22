// src/components/atoms/Icon/Icon.js
import React from 'react';
import './Icon.css'; // Create Icon.css

const Icon = ({ name, size = 'medium', className = '', ...props }) => {
	// In a real app, you'd map 'name' to an actual SVG or font icon.
	// For now, let's just use placeholder text or a common symbol.
	let iconContent;
	switch (name) {
	case 'user': iconContent = '👤'; break;
	case 'lock': iconContent = '🔒'; break;
	case 'mail': iconContent = '✉️'; break;
	case 'eye': iconContent = '👁️'; break;
	case 'eye-slash': iconContent = '🚫'; break;
	case 'company': iconContent = '🏢'; break;
	case 'check': iconContent = '✅'; break;
	case 'add-user': iconContent = '➕👤'; break;
	case 'add-product': iconContent = '➕📦'; break;
	case 'reports': iconContent = '📊'; break;
	case 'settings': iconContent = '⚙️'; break;
	case 'home': iconContent = '🏠'; break;
	case 'users': iconContent = '👥'; break;
	case 'suppliers': iconContent = '🚚'; break;
	case 'products': iconContent = '📦'; break;
	case 'sales': iconContent = '📈'; break;
	case 'transactions': iconContent = '💸'; break;
	case 'categories': iconContent = '🏷️'; break;
	case 'roles': iconContent = '🔑'; break;
	case 'permissions': iconContent = '📝'; break;
	default: iconContent = '✨'; break;
	}

	return (
		<span className={`icon icon-${size} ${className}`} {...props}>
			{iconContent}
		</span>
	);
};

export default Icon;