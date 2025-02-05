import axios from "axios";

const usersAPI = axios.create({baseURL: "http://localhost:8000/users"});

async function getUsers() {
    const response = await usersAPI.get("/");

    return response.data;
}

export {
    getUsers
}