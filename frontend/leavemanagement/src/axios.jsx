// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Backend server address
});

export default instance;
