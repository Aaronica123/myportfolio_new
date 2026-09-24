import axios from 'axios';

// Configured Axios client for the application
const axios_client = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios_client;
