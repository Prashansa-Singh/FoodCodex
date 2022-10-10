import axios from 'axios';

const url = (process.env.NODE_ENV == "production") ? process.env.PRODUCTION_BACKEND : "http://localhost:8000/";

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Access-Control-Allow-Origin': url,
        "Content-Type": "application/json",
    }
});

export { axiosInstance };