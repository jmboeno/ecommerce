const express = require("express");
const usersRoute = require("./routes/users");
const plansRoute = require("./routes/plans");
const providersRoute = require("./routes/providers");
const rechargesRoute = require("./routes/recharges");
const paymentsRoute = require("./routes/payments");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use("/users", usersRoute);
app.use("/plans", plansRoute);
app.use("/providers", providersRoute);
app.use("/recharges", rechargesRoute);
app.use("/payments", paymentsRoute);

const port = 8000;

app.get("/", (req, res) => {
    res.send("Olá mundo da alura!");
});

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
});