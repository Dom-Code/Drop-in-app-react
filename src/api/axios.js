import axios from 'axios';

const BASE_URL = 'https://drop-in-server.herokuapp.com';
// const BASE_URL = 'http://localhost:5000';

// localhost for when i want to access local database. 

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
});
