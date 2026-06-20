import axios from "axios";

const API_URL =
"https://fruitgo-backend.onrender.com/api/orders";

export const placeOrder = (order) => {
    return axios.post(API_URL, order);
};

export const getOrders = () => {
    return axios.get(API_URL);
};