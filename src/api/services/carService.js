import axios from "../axios";

const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

export const createCar = (car) => axios.post("/cars", car, config);

export const getCars = () => axios.get("/cars", config);
