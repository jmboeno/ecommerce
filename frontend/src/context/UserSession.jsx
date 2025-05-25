import React, { createContext, useContext, useState } from "react";
import http from '../http';
import { TokenStorage } from "../utils/TokenStorage";

const UserSessionContext = createContext({
	isUserLoggedIn: false,
	login: (email, password) => null,
	logout: () => null,
	profile: {}
})

export const useUserSessionContext = () => {
	return useContext(UserSessionContext)
}

export const UserSessionProvider = ({ children }) => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(TokenStorage.accessToken));

	const login = async (email, password) => {
		const response = await http.post('/auth/login', {
			email,
			password,
		});

		try {
			TokenStorage.setTokens(
				response.data.accessToken,
				response.data.refreshToken
			)
			setIsUserLoggedIn(true);
		} catch(error) {
			console.log(error)
		}
	}

	const logout = () => {
		TokenStorage.logout();
		setIsUserLoggedIn(false);
	}

	const value = {
		login,
		logout,
		isUserLoggedIn
	};

	return (
		<UserSessionContext.Provider value={value}>
			{children}
		</UserSessionContext.Provider>
	)
}