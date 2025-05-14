import React from 'react'
import { Global } from "@emotion/react";

const styles = (theme) => {
	return {
		html: {
			fontFamily: theme.fontFamily,
		},
		body: {
			margin: 0,
		},
	};
};

export const GlobalStyles = () => {
	return <Global styles={styles} />;
};