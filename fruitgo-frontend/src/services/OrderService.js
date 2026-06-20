import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const placeOrder = (order) => {
    return axios.post(API_URL, order);
};

export const getOrders = () => {
    return axios.get(API_URL);
};