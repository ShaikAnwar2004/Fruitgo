import axios from "axios";

const API_URL = "http://localhost:8080/api/fruits";

export const getAllFruits = () => {
    return axios.get(API_URL);
};