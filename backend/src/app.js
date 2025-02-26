const express = require("express");
const loginRoute = require("./routes/login");
const usersRoute = require("./routes/users");
const plansRoute = require("./routes/plans");
const providersRoute = require("./routes/providers");
const rechargesRoute = require("./routes/recharges");
const paymentsRoute = require("./routes/payments");
const rolesRoute = require("./routes/roles");
const permissionsRoute = require("./routes/permissions");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use("/login", loginRoute);
app.use("/users", usersRoute);
app.use("/plans", plansRoute);
app.use("/providers", providersRoute);
app.use("/recharges", rechargesRoute);
app.use("/payments", paymentsRoute);
app.use("/roles", rolesRoute);
app.use("/permissions", permissionsRoute);

const port = 8000;

app.get("/", (req, res) => {
    res.send("Olá mundo da alura!");
});

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
});