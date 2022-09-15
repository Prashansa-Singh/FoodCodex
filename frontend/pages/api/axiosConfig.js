import axios from 'axios';

//(process.env.NODE_ENV == "production") ? 'https://comp30022-programming-quokkas.herokuapp.com/' : 'http://localhost:8000/' ,

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/' ,
});

export {axiosInstance};