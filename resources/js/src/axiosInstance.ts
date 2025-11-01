import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('ACCESS_TOKEN');
  // config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // const {response} = error;
    // if (response.status === 401) {
    // } else if (response.status === 404) {
    // }
    return Promise.reject(error)
})

export default axiosInstance