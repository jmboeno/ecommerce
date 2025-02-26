const { insertRole } = require("../services/roles");

async function postRole(req, res) {
    const { name, description } = req.body;

    try {
        const role = await insertRole({ name, description });

        return res.status(200).json(role);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    postRole
};