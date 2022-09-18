import axios from 'axios';

const axiosInstance = axios.create({
	baseURL:
		process.env.NODE_ENV == 'production'
			? 'https://programming-quokkas-backend.herokuapp.com/'
			: 'http://localhost:8000/',
});

export { axiosInstance };
