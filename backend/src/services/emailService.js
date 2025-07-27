const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com", // Exemplo: smtp.gmail.com
	port: 587, // ou 465 para SSL
	secure: false, // true para 465, false para outras portas
	auth: {
		user: "boeno.jonas@gmail.com",
		pass: "rtox idgb vrnd lkvm"
	}
});

async function sendActivationEmail(toEmail, activationLink, userName) {
	const mailOptions = {
		from: '"Sua Empresa" <no-reply@suaempresa.com>',
		to: toEmail,
		subject: "Ative sua conta",
		html: `
			<p>Olá ${userName},</p>
			<p>Obrigado por se registrar! Por favor, clique no link abaixo para ativar sua conta:</p>
			<a href="${activationLink}">${activationLink}</a>
			<p>Este link é válido por 24 horas.</p>
		`
	};

	return transporter.sendMail(mailOptions);
}

module.exports = { sendActivationEmail };
