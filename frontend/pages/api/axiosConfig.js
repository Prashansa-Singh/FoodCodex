import axios from 'axios';

const url = (process.env.NODE_ENV == "production") ? process.env.PRODUCTION_BACKEND : process.env.DEVELOPMENT_BACKEND;

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Access-Control-Allow-Origin': url,
        "Content-Type": "application/json",
    }
});

export { axiosInstance };