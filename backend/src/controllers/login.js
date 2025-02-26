const { authenticate } = require("../services/login");

async function postLogin(req, res) {
    const { email, password } = req.body;

    try {
        const login = await authenticate({ email, password });

        return res.status(200).json(login);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = {
    postLogin
};