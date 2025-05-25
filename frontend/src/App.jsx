import React from "react";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./components/GlobalStyles/GlobalStyles";
import { ThemeProviderWrapper } from "./components/ThemeProvider/ThemeProvider";
import { router } from "./router/router";
import { UserSessionProvider } from "./context/UserSession";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
	return (
		<ThemeProviderWrapper>
			<GlobalStyles />
			<UserSessionProvider>
				<RouterProvider router={router} />
			</UserSessionProvider>
			<ToastContainer position="top-right" autoClose={3000} />
		</ThemeProviderWrapper>
	);
}

export default App;