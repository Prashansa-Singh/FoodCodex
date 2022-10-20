import axios from 'axios';

const url = (process.env.NODE_ENV == "production") ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND : process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND;

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Access-Control-Allow-Origin': url,
        "Content-Type": "application/json",
    }
});

export { axiosInstance };