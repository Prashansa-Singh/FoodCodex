import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import {axiosInstance} from './api/axiosConfig';
import axios from 'axios';

export default function Signup() {

	const submitUser = async (event) => {
		event.preventDefault();
		const userName = event.target.userName.value;
		const password = event.target.password.value;
		const displayName = event.target.displayName.value;

		const body = JSON.stringify({
			userName: userName,
			password: password,
			displayName: displayName,
		});

		const res = await axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: 'http://localhost:8000/account/signup',
			data: body,
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
		
	
	}

	const title = `${siteTitle} - Signup`;
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Sign Up
				</h1>

				<form onSubmit={submitUser}>
					<label> Enter a user name </label>
					<input type="text" placeholder="Username" name="userName" required/>
					<br/>

					<label> Set a password </label>
					<input type="password" placeholder="Password" name="password" required/>
					<br/>

					<label> Choose a display name </label>
					<input type="text" placeholder="Display Name" name="displayName" required/>
					<br/>
					
					<input type="submit"/>
				</form>
			</section>
		</Layout>
	);
}