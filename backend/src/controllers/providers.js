const { getAllProviders, insertProvider, getProviderById, getProviderByName, updateProvider, deleteProviderById } = require("../services/providers");

async function getProviders(req, res) {
    try {
        const listAllProviers = await getAllProviders();
        return res.status(200).json(listAllProviers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getProvider(req, res) {
    try {
        const { id } = req.params;

        if (id && Number(id)) {
            const plan = await getProviderById(id);

            if (plan.message) {
                return res.status(404).json(plan);
            }

            return res.status(200).json(plan);
        } else {
            return res.status(422).json({ message: "Id inválido" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function postProvider(req, res) {
    try {
        const newPlan = req.body;

        if (newPlan.name) {
            const createdPlan = await insertProvider(newPlan);
            return res.status(201).json(createdPlan);
        } else {
            return res.status(422).json({ message: "O campo nome é obrigatório" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function searchProviderByName(req, res) {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: "Parâmetro 'name' é obrigatório" });
        }

        const plans = await getProviderByName(name);

        if (plans.length === 0) {
            return res.status(404).json({ message: "Nenhum provedor encontrado com esse nome" });
        }

        return res.status(200).json(plans);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function patchProvider(req, res) {
    const id = req.params.id;
    const newinfo = req.body;

    try {
        const message = await updateProvider(newinfo, id);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deleteProvider(req, res) {
    try {
        const id = req.params.id;

        if (id && Number(id)) {
            const message = await deleteProviderById(id);

            if (message.message === "Provedor não encontrado para exclusão!") {
                return res.status(404).json(message);
            }

            return res.status(200).json(message);
        } else {
            return res.status(422).json({ message: "Id inválido" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProviders,
    getProvider,
    postProvider,
    searchProviderByName,
    patchProvider,
    deleteProvider
};