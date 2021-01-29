import axios from "axios";

const instance = axios.create({
    baseURL: 'https://footballapisf.herokuapp.com',
    timeout: 10000,
    withCredentials: true
});

export default instance;