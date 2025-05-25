const express = require("express");
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const plansRoute = require("./routes/plansRoute");
const providersRoute = require("./routes/providersRoute");
const rechargesRoute = require("./routes/rechargesRoute");
const paymentsRoute = require("./routes/paymentsRoute");
const rolesRoute = require("./routes/rolesRoute");
const permissionsRoute = require("./routes/permissionsRoute");
const profileRoute = require("./routes/profileRoute");
const securityRoute = require("./routes/securityRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use("/auth", authRoute);
app.use("/security", securityRoute);
app.use("/dashboard/profile", profileRoute);
app.use("/dashboard/users", usersRoute);
app.use("/dashboard/roles", rolesRoute);
app.use("/dashboard/permissions", permissionsRoute);
app.use("/dashboard/recharges", rechargesRoute);
app.use("/dashboard/plans", plansRoute);
app.use("/dashboard/providers", providersRoute);
app.use("/dashboard/payments", paymentsRoute);

const port = 8000;

app.listen(port, () => {
	console.log(`Escutando a porta ${port}`);
});