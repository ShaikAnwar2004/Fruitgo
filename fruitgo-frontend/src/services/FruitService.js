import axios from "axios";

const API_URL =
"https://fruitgo-backend-l1on.onrender.com/api/fruits";

export const getAllFruits = () => {
    return axios.get(API_URL);
};