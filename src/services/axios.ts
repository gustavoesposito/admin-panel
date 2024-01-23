import axios from 'axios';

const api = axios.create({
  baseURL: 'https://38375370-103e-44f9-ba50-67c60bff12f7.mock.pstmn.io/'
});

export default api;
