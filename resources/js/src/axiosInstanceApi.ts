import axios from "axios";

const axiosInstanceApi = axios.create({
  baseURL: 'http://localhost/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstanceApi.interceptors.request.use((config) => {
  // const token = localStorage.getItem('ACCESS_TOKEN');
  // config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosInstanceApi.interceptors.response.use(
  response => response,
  error => {
    // const {response} = error;
    // if (response.status === 401) {
    // } else if (response.status === 404) {
    // }
    return Promise.reject(error)
})

export default axiosInstanceApi