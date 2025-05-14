const express = require("express");
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const plansRoute = require("./routes/plansRoute");
const providersRoute = require("./routes/providersRoute");
const rechargesRoute = require("./routes/rechargesRoute");
const paymentsRoute = require("./routes/paymentsRoute");
const rolesRoute = require("./routes/rolesRoute");
const permissionsRoute = require("./routes/permissionsRoute");
const loggedAreaRoute = require("./routes/loggedAreaRoute");
const securityRoute = require("./routes/securityRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/plans", plansRoute);
app.use("/providers", providersRoute);
app.use("/recharges", rechargesRoute);
app.use("/payments", paymentsRoute);
app.use("/roles", rolesRoute);
app.use("/permissions", permissionsRoute);
app.use("/security", securityRoute);
app.use("/logged-area", loggedAreaRoute);

const port = 8000;

app.listen(port, () => {
	console.log(`Escutando a porta ${port}`);
});