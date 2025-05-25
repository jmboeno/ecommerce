import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Completed from "../pages/registration/Completed";
import PersonalData from "../pages/registration/PersonalData";
import BaseLayoutRegistration from "../pages/registration/BaseLayoutRegistration";
import InitialPage from "../pages/initial-page/InitialPage";
import Page404 from "../pages/errors/Page404";
import BaseLayout from "../pages/BaseLayout";
import Login from "../pages/login/Login";
import Profile from "../pages/dashboard/Profile";
import Recharges from '../pages/dashboard/Recharges';
import BaseLayoutDashboard from '../pages/dashboard/BaseLayoutDashboard';
import Users from '../pages/dashboard/Users';
import Plans from '../pages/dashboard/Plans';
import Roles from '../pages/dashboard/Roles';
import Permissions from '../pages/dashboard/Permissions';
import Providers from '../pages/dashboard/Providers';
import Payments from '../pages/dashboard/Payments';

export const router = createBrowserRouter([
	{
		path: "/",
		element: <BaseLayout />,
		errorElement: <Page404 />,
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
				path: "dashboard",
				element: <BaseLayoutDashboard />,
				children: [
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "recharges",
						element: <Recharges />,
					},
					{
						path: "users",
						element: <Users />,
					},
					{
						path: "plans",
						element: <Plans />,
					},
					{
						path: "roles",
						element: <Roles />,
					},
					{
						path: "permissions",
						element: <Permissions />,
					},
					{
						path: "providers",
						element: <Providers />,
					},
					{
						path: "payments",
						element: <Payments />,
					},
				],
			},
			{ path: "*", element: <Page404 /> },
		],
	},
]);
