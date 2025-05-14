import React, { createContext, useContext } from "react";
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
	const login = (email, password) => {
		http.post('/auth/login', {
			email,
			password,
		})
			.then(response => {
				TokenStorage.setTokens(
					response.data.accessToken,
					response.data.refreshToken
				)
			})
			.catch(error => console.log(error))
	}

	const value = { login };

	return (
		<UserSessionContext.Provider value={value}>
			{children}
		</UserSessionContext.Provider>
	)
}