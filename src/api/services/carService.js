import { requestWithAuthHeader } from "../helpers";

export const createCar = (car) => requestWithAuthHeader("POST", "/cars", car);

export const getCars = () => requestWithAuthHeader("GET", "/cars");
