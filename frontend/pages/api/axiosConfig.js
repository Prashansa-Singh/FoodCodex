import axios from 'axios';

const url = (process.env.NODE_ENV == "production") ? 'https://comp30022-programming-quokkas.herokuapp.com/' : 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: url ,
});

export { axiosInstance };
