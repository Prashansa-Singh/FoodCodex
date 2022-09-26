import axios from 'axios';

const url = (process.env.NODE_ENV == "production") ? 'https://programming-quokkas-backend.herokuapp.com/' : 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: url ,
    headers: {
        'Access-Control-Allow-Origin': url,
        "Content-Type": "application/json",
    }
});

export { axiosInstance };