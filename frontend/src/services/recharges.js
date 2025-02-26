import axios from "axios";

const rechargesAPI = axios.create({ baseURL: "http://localhost:8000/recharges" });

async function getRecharges() {
    const response = await rechargesAPI.get("/");

    return response.data;
}


export {
    getRecharges
}