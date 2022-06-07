import axios from 'axios';
import { responseLogger } from 'axios-logger';
export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
})

let test = "false";
if (test === 'true') {
    api.interceptors.response.use(responseLogger);
}

export default api;