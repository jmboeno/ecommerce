// front/src/components/pages/ProfilePage/ProfilePage.jsx
import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import DashboardLayout from "../../templates/DashboardLayout/DashboardLayout.jsx";
import FormField from "../../mols/FormField/FormField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Text from "../../atoms/Text/Text.jsx";
import Icon from "../../atoms/Icon/Icon.jsx";
import InputMask from "react-input-mask";
import { LoadingContext } from "../../../context/LoadingContext.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { fetchUserProfile, updateUserProfile, changeUserPassword } from "../../../services/profileService.js";
import { toast } from "react-toastify";

const ProfilePage = () => {
	const { user, isAuthenticated, fetchUser } = useContext(AuthContext);
	const { startLoading, stopLoading, isLoading } = useContext(LoadingContext);

	const [profileData, setProfileData] = useState({
		name: "",
		email: "",
		phone: "",
	});
	const [originalProfileData, setOriginalProfileData] = useState({});
	const [errors, setErrors] = useState({});
	const [isEditing, setIsEditing] = useState(false);

	const [passwordChangeData, setPasswordChangeData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const [passwordErrors, setPasswordErrors] = useState({});

	const profileLoadInitiated = useRef(false);

	const effectRunCount = useRef(0);
	const loadProfileCallCount = useRef(0);


	const loadProfile = useCallback(async () => {
		loadProfileCallCount.current += 1;
		console.log(`loadProfile chamada. Contagem de chamadas à função: ${loadProfileCallCount.current}`);

		if (profileLoadInitiated.current) {
			console.log("loadProfile: Requisição de perfil já iniciada. Abortando nova tentativa.");
			return;
		}

		if (!isAuthenticated || !user?.id) {
			console.log("loadProfile: Usuário não autenticado ou user.id ausente. Abortando.");
			return;
		}

		profileLoadInitiated.current = true;
		startLoading();
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Token de autenticação não encontrado.");
			}
			const response = await fetchUserProfile(user.id, token);
			if (response.success && response.user) {
				const fetchedUser = response.user;
				setProfileData({
					name: fetchedUser.name || "",
					email: fetchedUser.email || "",
					phone: fetchedUser.phone || "",
					department: "Information Technology",
					bio: "Experienced administrator with over 5 years in business management systems. Passionate about streamlining processes and improving team efficiency.",
					memberSince: fetchedUser.createdAt ? new Date(fetchedUser.createdAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) : "N/A",
					lastLogin: "2 hours ago",
					activeSessions: 3,
				});
				setOriginalProfileData({
					name: fetchedUser.name || "",
					email: fetchedUser.email || "",
					phone: fetchedUser.phone || "",
					department: "Information Technology",
					bio: "Experienced administrator with over 5 years in business management systems.",
					memberSince: fetchedUser.createdAt ? new Date(fetchedUser.createdAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) : "N/A",
					lastLogin: "2 hours ago",
					activeSessions: 3,
				});
				console.log("ProfilePage: Dados do perfil carregados com sucesso.", fetchedUser);
			} else {
				toast.error(response.message || "Falha ao carregar dados do perfil.");
				console.log("ProfilePage: Falha ao carregar perfil. Mensagem:", response.message);
			}
		} catch (error) {
			console.error("ProfilePage: Erro ao carregar perfil:", error);
			toast.error(error.message || "Erro ao carregar seu perfil.");
		} finally {
			stopLoading();
			console.log("ProfilePage: stopLoading disparado para carregamento de perfil.");
		}
	}, [isAuthenticated, user?.id, startLoading, stopLoading]);

	useEffect(() => {
		effectRunCount.current += 1;
		console.log(`ProfilePage useEffect executado. Contagem: ${effectRunCount.current}`);
		console.log("Estado atual (início useEffect Profile): isAuthenticated:", isAuthenticated, "user:", user ? user.id : "null", "profileLoadInitiated.current:", profileLoadInitiated.current);

		if (isAuthenticated && user?.id && !profileLoadInitiated.current) {
			loadProfile();
		} else {
			console.log("ProfilePage: Condição para carregar perfil NÃO atendida.");
		}
	}, [isAuthenticated, user?.id, loadProfile]);

	const validatePersonalData = () => {
		let newErrors = {};
		if (!profileData.name) newErrors.name = "Nome é obrigatório";
		if (!profileData.email) {
			newErrors.email = "Email é obrigatório";
		} else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
			newErrors.email = "Email inválido";
		}
		if (profileData.phone && profileData.phone.replace(/\D/g, "").length !== 11) {
			newErrors.phone = "Telefone inválido";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChangePersonalData = (e) => {
		const { name, value } = e.target;
		setProfileData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmitPersonalData = async (e) => {
		e.preventDefault();
		if (!validatePersonalData()) {
			toast.error("Por favor, corrija os erros no formulário de informações pessoais.");
			return;
		}

		startLoading();
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Token de autenticação não encontrado.");
			}

			const updatedFields = {
				name: profileData.name,
				email: profileData.email,
				phone: profileData.phone,
			};

			const result = await updateUserProfile(user.id, updatedFields, token);
			if (result.success) {
				toast.success(result.message);
				setIsEditing(false);
				await fetchUser();
			} else {
				toast.error(result.message || "Falha ao atualizar perfil.");
			}
		} catch (error) {
			console.error("Erro ao atualizar perfil:", error);
			toast.error(error.message || "Erro ao atualizar seu perfil.");
		} finally {
			stopLoading();
		}
	};

	const validatePasswordChange = () => {
		let newErrors = {};
		if (!passwordChangeData.currentPassword) newErrors.currentPassword = "Senha atual é obrigatória.";
		if (!passwordChangeData.newPassword) {
			newErrors.newPassword = "Nova senha é obrigatória.";
		} else if (passwordChangeData.newPassword.length < 6) {
			newErrors.newPassword = "A nova senha deve ter pelo menos 6 caracteres.";
		}
		if (!passwordChangeData.confirmNewPassword) {
			newErrors.confirmNewPassword = "Confirmação da nova senha é obrigatória.";
		} else if (passwordChangeData.newPassword !== passwordChangeData.confirmNewPassword) {
			newErrors.confirmNewPassword = "As novas senhas não coincidem.";
		}
		setPasswordErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChangePasswordData = (e) => {
		const { name, value } = e.target;
		setPasswordChangeData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmitPasswordChange = async (e) => {
		e.preventDefault();
		if (!validatePasswordChange()) {
			toast.error("Por favor, corrija os erros no formulário de alteração de senha.");
			return;
		}

		startLoading();
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Token de autenticação não encontrado.");
			}

			const result = await changeUserPassword(user.id, passwordChangeData, token);
			if (result.success) {
				toast.success(result.message);
				setPasswordChangeData({ currentPassword: "", newPassword: "", confirmNewNewPassword: "" });
				setPasswordErrors({});
			} else {
				toast.error(result.message || "Falha ao alterar senha.");
			}
		} catch (error) {
			console.error("Erro ao alterar senha:", error);
			toast.error(error.message || "Erro ao alterar sua senha.");
		} finally {
			stopLoading();
		}
	};

	const renderPhoneInput = (props) => (
		<InputMask
			mask="(99) 99999-9999"
			value={props.value}
			onChange={props.onChange}
			disabled={props.disabled}
			readOnly={props.disabled}
		>
			{(inputProps) => (
				<input
					{...inputProps}
					type="text"
					className="input with-icon"
				/>
			)}
		</InputMask>
	);

	return (
		<DashboardLayout pageTitle="Profile Settings">
			<div style={{ padding: "20px" }}>
				{/* 1. Profile Header */}
				<div style={{
					display: "flex",
					alignItems: "center",
					gap: "20px",
					background: "linear-gradient(135deg, var(--primary-purple) 0%, var(--dark-purple) 100%)",
					color: "white",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
					justifyContent: "space-between",
					flexWrap: "wrap",
				}}>
					<div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
						<img src="https://via.placeholder.com/80/8c52ff/FFFFFF?text=JD" alt="User Avatar" style={{ borderRadius: "50%", width: "80px", height: "80px", border: "3px solid white" }} />
						<div>
							<Text variant="h3" style={{ color: "white", marginBottom: "5px" }}>{user?.name || "Loading..."}</Text>
							<Text variant="body" style={{ color: "white", opacity: 0.8 }}>{user?.role || "N/A"}</Text>
							<Text variant="small" style={{ color: "white", opacity: 0.7 }}>Member since {profileData.memberSince}</Text>
						</div>
					</div>
					<div>
						{!isEditing ? (
							<Button type="button" onClick={() => setIsEditing(true)} variant="secondary" style={{ color: "white", borderColor: "white" }}>
								<Icon name="pencil" /> Edit Profile
							</Button>
						) : null} {/* <-- Removed 'Edit Profile' button here when editing mode is active */}
					</div>
				</div>

				{/* Grid para as seções de informações */}
				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
					{/* 2. Personal Information */}
					<div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
							<Text variant="h4">Personal Information</Text>
							{isEditing && (
								<Icon name="pencil" size="large" style={{ color: "var(--primary-purple)" }} />
							)}
						</div>
						<form onSubmit={handleSubmitPersonalData}>
							<FormField
								label="Full Name"
								type="text"
								name="name"
								value={profileData.name}
								onChange={handleChangePersonalData}
								iconName="user"
								id="profile-full-name"
								error={errors.name}
								required
								disabled={!isEditing || isLoading}
							/>
							<FormField
								label="Email Address"
								type="email"
								name="email"
								value={profileData.email}
								onChange={handleChangePersonalData}
								iconName="mail"
								id="profile-email-address"
								error={errors.email}
								required
								disabled={!isEditing || isLoading}
							/>
							<FormField
								label="Phone Number"
								name="phone"
								value={profileData.phone}
								onChange={handleChangePersonalData}
								iconName="phone"
								id="profile-phone-number"
								error={errors.phone}
								required
								disabled={!isEditing || isLoading}
								renderInput={() => renderPhoneInput({ value: profileData.phone, onChange: handleChangePersonalData, disabled: !isEditing || isLoading })}
							/>
							{/* Department e Bio removidos conforme discussão para focar nos campos do User */}
							
							{/* Botões de Salvar/Cancelar edição de dados pessoais */}
							{isEditing && (
								<div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
									<Button type="button" onClick={() => { setIsEditing(false); setProfileData(originalProfileData); setErrors({}); }} variant="secondary" disabled={isLoading}>
										<Icon name="close" /> Cancelar
									</Button>
									<Button type="submit" variant="primary" disabled={isLoading}>
										<Icon name="check" /> Salvar Alterações
									</Button>
								</div>
							)}
						</form>
					</div>

					{/* 3. Security (Formulário de alteração de senha) */}
					<div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
							<Text variant="h4">Security</Text>
							<Icon name="lock" size="large" style={{ color: "var(--primary-purple)" }} />
						</div>
						<form onSubmit={handleSubmitPasswordChange}>
							<FormField
								label="Current Password"
								type="password"
								name="currentPassword"
								value={passwordChangeData.currentPassword}
								onChange={handleChangePasswordData}
								iconName="lock"
								id="current-password"
								error={passwordErrors.currentPassword}
								required
								disabled={isLoading}
							/>
							<FormField
								label="New Password"
								type="password"
								name="newPassword"
								value={passwordChangeData.newPassword}
								onChange={handleChangePasswordData}
								iconName="lock"
								id="new-password"
								error={passwordErrors.newPassword}
								required
								disabled={isLoading}
							/>
							<FormField
								label="Confirm New Password"
								type="password"
								name="confirmNewPassword"
								value={passwordChangeData.confirmNewPassword}
								onChange={handleChangePasswordData}
								iconName="lock"
								id="confirm-new-password"
								error={passwordErrors.confirmNewPassword}
								required
								disabled={isLoading}
							/>
							<div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
								<Button type="submit" variant="primary" disabled={isLoading}>
									<Icon name="check" /> Change Password
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default ProfilePage;