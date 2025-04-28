import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CenterContent } from "../components/CenterContent";
import { Button } from "../components/Button";
import { login, checkAuth } from "../services/authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContainer = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100vh - 100px);
	display: flex;
`;

const LoginBox = styled.div`
	background-color: #f5f5f5;
	padding: 32px;
	border-radius: 12px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	width: 320px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Input = styled.input`
	padding: 12px;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 16px;
`;

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (checkAuth()) {
			navigate("/dashboard");
		}
	}, [navigate]);

	const handleLogin = async () => {
		try {
			const data = await login(email, password);
			localStorage.setItem("token", data.accessToken);
			toast.success("Login bem-sucedido!");
			navigate("/dashboard");
		} catch (err) {
			toast.error(err.response?.data?.message);
		}
	};

	return (
		<AppContainer>
			<CenterContent centered>
				<LoginBox>
					<h2>Login</h2>
					<Input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button color="success" onClick={handleLogin}>
						Entrar
					</Button>
				</LoginBox>
			</CenterContent>
			<ToastContainer position="top-center" autoClose={3000} />
		</AppContainer>
	);
}

export default Login;
