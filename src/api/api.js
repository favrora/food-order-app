import axios from "axios";

const API_URL = "https://foodprint.p.rapidapi.com/api/foodprint/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-rapidapi-host": "foodprint.p.rapidapi.com",
    "x-rapidapi-key": "0e0b5e80e5msh7e16c53a5b27a64p13843bjsna871f39189ca",
  },
});