import React from 'react'
import { ThemeProvider } from "@emotion/react";

const theme = {
	colors: {
		white: "#FFF",
		alert: "",
		focus: "#B009FF",
		primary: {
			a: "#5754ED",
			b: "#D93114",
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
