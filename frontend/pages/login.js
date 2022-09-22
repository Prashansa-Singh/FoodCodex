import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import LoginButton from '../components/loginbutton';

import {axiosInstance} from './api/axiosConfig';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
	
	const router = useRouter();

	const submitUser = async (event) => {
		event.preventDefault();
		const userName = event.target.userName.value;
		const password = event.target.password.value;

		const body = {
			userName: userName,
			password: password,
		};

		const url = '/account/login';

		axiosInstance.post(url, body)
		.then(function (response) {
			console.log(response.data);
			router.push('/view-restaurant');
		})
		.catch(function (error) {
			console.log(error);
		});	
	
	}

	const title = `${siteTitle} - Login`;



	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>Login</h1>

				<form onSubmit={submitUser}>
					<label> Enter a user name </label>
					<input type="text" placeholder="Username" name="userName" required/>
					<br/>

					<label> Set a password </label>
					<input type="password" placeholder="Password" name="password" required/>
					<br/>

					
					<input type="submit"/>
				</form>


				<LoginButton />
			</section>
		</Layout>
	);
}
