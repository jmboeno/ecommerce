const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Rotas
const authRoute = require("./routes/authRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const usersRoute = require("./routes/usersRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const suppliersRoute = require("./routes/suppliersRoute");
const productsRoute = require("./routes/productsRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const rolesRoute = require("./routes/rolesRoute");
const permissionsRoute = require("./routes/permissionsRoute");
const profileRoute = require("./routes/profileRoute");
const securityRoute = require("./routes/securityRoute");

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));

// Rotas
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);
app.use("/security", securityRoute);
app.use("/profile", profileRoute);
app.use("/users", usersRoute);
app.use("/roles", rolesRoute);
app.use("/permissions", permissionsRoute);
app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);
app.use("/suppliers", suppliersRoute);
app.use("/transactions", transactionsRoute);

// Middleware de erro global
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Erro interno do servidor" });
});

module.exports = app;