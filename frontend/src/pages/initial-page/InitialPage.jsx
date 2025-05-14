import React from 'react'
import { GlobalStyles } from "../../components/GlobalStyles/GlobalStyles";
import { ThemeProviderWrapper } from "../../components/ThemeProvider/ThemeProvider";

const InitialPage = () => {
	return (
		<ThemeProviderWrapper>
			<GlobalStyles />
			Página inicial
		</ThemeProviderWrapper>
	);
};

export default InitialPage;