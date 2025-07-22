require("dotenv").config();
const app = require("./app");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerSpec");

const PORT = process.env.PORT || 8000;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
