const { insertPermission } = require("../services/permissions");

async function postPermission(req, res) {
    const { name, description } = req.body;

    try {
        const permission = await insertPermission({ name, description });

        return res.status(200).json(permission);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    postPermission
};