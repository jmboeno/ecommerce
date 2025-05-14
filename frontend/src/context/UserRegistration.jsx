import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from '../http';

const initialUser = {
	profile: "",
	name: "",
	email: "",
	password: "",
	confirmedPassword: ""
};

export const UserRegistrationContext = createContext({
	user: initialUser,
	errors: {},
	setProfile: () => null,
	setFullName: () => null,
	setEmail: () => null,
	setPassword: () => null,
	setConfirmedPassword: () => null,
	submitUser: () => null,
});

export const useUserRegistrationContext = () => {
	return useContext(UserRegistrationContext);
};

export const UserRegistrationProvider = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState(initialUser);

	const setProfile = (profile) => {
		setUser((previousState) => {
			return {
				...previousState,
				profile,
			};
		});
	};

	const setFullName = (name) => {
		setUser((previousState) => {
			return {
				...previousState,
				name,
			};
		});
	};

	const setEmail = (email) => {
		setUser((previousState) => {
			return {
				...previousState,
				email,
			};
		});
	};

	const setPassword = (password) => {
		setUser((previousState) => {
			return {
				...previousState,
				password,
			};
		});
	};

	const setConfirmedPassword = (confirmedPassword) => {
		setUser((previousState) => {
			return {
				...previousState,
				confirmedPassword,
			};
		});
	};

	const submitUser = () => {
		const { name, email, password, profile } = user;

		http.post('/auth/register', { name, email, password, profile })
			.then(() => {
				navigate('/registration/completed')
			})
			.catch(e => {
				console.error(e)
			})
	};

	const context = {
		user,
		setProfile,
		setFullName,
		setEmail,
		setPassword,
		setConfirmedPassword,
		submitUser,
	};

	return (
		<UserRegistrationContext.Provider value={context}>
			{children}
		</UserRegistrationContext.Provider>
	);
};