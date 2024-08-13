import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:5173/messages'
});

export default axiosApi;
