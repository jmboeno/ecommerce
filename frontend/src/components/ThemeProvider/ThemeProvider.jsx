import React from 'react'
import { ThemeProvider } from "@emotion/react";

const theme = {
	colors: {
		white: "#FFF",
		alert: "",
		focus: "#B009FF",
		primary: {
			a: "#45b1ff",
			b: "#2a91dc",
			c: "",
		},
		secondary: {
			a: "#F8F8FD",
			b: "",
			c: "",
		},
		neutral: {
			a: "#373737",
			b: "",
			c: "",
			d: "",
		},
		dark: {
			a: "",
			b: "#B61B00",
		},
		opacity: {
			a: "#93939361"
		}
	},
	spacings: {
		xs: "8px",
		s: "16px",
		l: "32px",
		xl: "48px",
	},
	fontFamily: "'Montserrat', sans-serif",
};

export const ThemeProviderWrapper = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
