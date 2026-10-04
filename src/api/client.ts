import axios, { AxiosInstance } from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const REQUEST_TIMEOUT_MS = 10_000;

const apiClient: AxiosInstance = axios.create({
  baseURL: POKEAPI_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

export default apiClient;
