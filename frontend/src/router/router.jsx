import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Completed from "../pages/registration/Completed";
import PersonalData from "../pages/registration/PersonalData";
import BaseLayoutRegistration from "../pages/registration/BaseLayoutRegistration";
import InitialPage from "../pages/initial-page/InitialPage";
import Page404 from "../pages/errors/Page404";
import BaseLayout from "../pages/BaseLayout";
import Login from "../pages/login/Login";
import Profile from "../pages/logged-area/Profile";
import BaseLayoutLoggedArea from "../pages/logged-area/BaseLayoutLoggedArea";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <BaseLayout />,
		ErrorBoundary: Page404,
		children: [
			{
				path: "",
				element: <InitialPage />
			},
			{
				path: "login",
				element: <Login />
			},
			{
				path: "registration",
				element: <BaseLayoutRegistration />,
				children: [
					{
						path: "",
						element: <PersonalData />,
					},
					{
						path: "completed",
						element: <Completed />,
					},
				],
			},
			{
				path: "logged-area",
				element: <BaseLayoutLoggedArea />,
				children: [
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "pedidos",
						element: <div />,
					},
				],
			},
		],
	},
]);
