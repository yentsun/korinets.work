import axios from 'axios';


export default function createApi(baseURL, transformResponse, params) {
    const instance = axios.create({ baseURL, params });
    instance.interceptors.response.use(transformResponse);
    return instance;
}
