import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import FormField from '../../mols/FormField/FormField';
import Button from '../../atoms/Button/Button';
import CheckboxWithLabel from '../../mols/CheckboxWithLabel/CheckboxWithLabel';
import Text from '../../atoms/Text/Text';
import Icon from '../../atoms/Icon/Icon';
import './RegistrationForm.css';

const RegistrationForm = ({ onSubmit, isLoading }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};
		if (!name) newErrors.name = 'Nome é obrigatório';
		if (!email) {
			newErrors.email = 'Email é obrigatório';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email inválido';
		}
		if (!phone || phone.replace(/\D/g, '').length !== 11) {
			newErrors.phone = 'Telefone inválido';
		}
		if (!password) {
			newErrors.password = 'Senha é obrigatória';
		} else if (password.length < 6) {
			newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
		}
		if (!confirmPassword) {
			newErrors.confirmPassword = 'Confirme sua senha';
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = 'As senhas não coincidem';
		}
		if (!agreeTerms) newErrors.agreeTerms = 'Você deve aceitar os termos';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			onSubmit({ name, email, phone, password });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="registration-form">
			<FormField
				label="Nome"
				type="text"
				placeholder="Seu nome completo"
				value={name}
				onChange={(e) => setName(e.target.value)}
				iconName="user"
				id="reg-name"
				error={errors.name}
				required
			/>
			<FormField
				label="Email"
				type="email"
				placeholder="Seu email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				iconName="mail"
				id="reg-email"
				error={errors.email}
				required
			/>
			<FormField
				label="Telefone"
				id="reg-phone"
				iconName="phone"
				error={errors.phone}
				required
				renderInput={() => (
					<InputMask
						mask="(99) 99999-9999"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					>
						{(inputProps) => (
							<input
								{...inputProps}
								type="text"
								className="input with-icon"
							/>
						)}
					</InputMask>
				)}
			/>
			<FormField
				label="Senha"
				type={showPassword ? 'text' : 'password'}
				placeholder="Crie uma senha forte"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				iconName={showPassword ? 'eye-slash' : 'eye'}
				iconClickable={true}
				onIconClick={() => setShowPassword(!showPassword)}
				id="reg-password"
				error={errors.password}
				required
			/>
			<FormField
				label="Confirmar senha"
				type={showConfirmPassword ? 'text' : 'password'}
				placeholder="Confirme sua senha"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				iconName={showConfirmPassword ? 'eye-slash' : 'eye'}
				iconClickable={true}
				onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
				id="reg-confirm-password"
				error={errors.confirmPassword}
				required
			/>
			<CheckboxWithLabel
				id="agree-terms"
				label={
					<>
						Aceito os <a href="/terms" target="_blank" rel="noopener noreferrer">Termos</a> e a <a href="/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
					</>
				}
				checked={agreeTerms}
				onChange={() => {
					setAgreeTerms(!agreeTerms);
					if (errors.agreeTerms) {
						setErrors(prev => ({ ...prev, agreeTerms: undefined }));
					}
				}}
			/>
			{errors.agreeTerms && <Text variant="small" className="error-message">{errors.agreeTerms}</Text>}

			<Button type="submit" variant="primary" className="register-button" disabled={isLoading}>
				{isLoading ? 'Criando conta...' : <><Icon name="user" /> Criar conta</>}
			</Button>
			<Text variant="small" className="login-link">
				Já tem uma conta? <a href="/login">Entrar</a>
			</Text>
		</form>
	);
};

export default RegistrationForm;
