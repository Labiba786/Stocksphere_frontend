import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stocksphere-backend-329r.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default instance; 