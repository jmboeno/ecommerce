import React from 'react'
import { ThemeProvider } from "@emotion/react";

const theme = {
	colors: {
		white: "#FFF",
		alert: "",
		focus: "#B009FF",
		font: "#1f1f1f",
		default: {
			a: "#c2c6cd",
			b: "#2a2b35",
			c: "",
		},
		primary: {
			a: "#45b1ff",
			b: "#2a91dc",
			c: "",
		},
		danger: {
			a: "#ff4545",
			b: "#bb2828",
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
			a: "#82878f",
			b: "#494949",
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
