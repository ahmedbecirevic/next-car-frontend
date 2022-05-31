import axios from "./axios";

export const requestWithAuthHeader = (method, url, data) => axios({
  method,
  url,
  data,
  headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
});

