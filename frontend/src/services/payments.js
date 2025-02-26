import axios from "axios";

const paymentsAPI = axios.create({ baseURL: "http://localhost:8000/payments" });

async function getPayments() {
    const response = await paymentsAPI.get("/");

    return response.data;
}

export {
    getPayments
}