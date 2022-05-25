import axios from "../axios";

export const createCar = (car) => axios.post("/cars", car);

export const getCars = () => axios.get("/cars");
