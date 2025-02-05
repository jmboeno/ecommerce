const express = require("express");
const usersRoute = require("./routes/users");
const plansRoute = require("./routes/plans");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use("/users", usersRoute);
app.use("/plans", plansRoute);

const port = 8000;

app.get("/", (req, res) => {
    res.send("Olá mundo da alura!");
});

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
});