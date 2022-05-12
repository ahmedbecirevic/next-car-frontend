import axios from "axios";

export default axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });
// instance.interceptors.request.use(
//   (config) => {
//     document.cookie;

//     return config;
//   },
//   (error) => Promise.reject(error),
// );
