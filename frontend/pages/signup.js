import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import {axiosInstance} from './api/axiosConfig';
import axios from 'axios';
import { useRouter } from 'next/router';

import React from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Stack } from '@mui/system';
import Button from '@mui/material/Button';

export default function Signup() {

	const router = useRouter();

	const submitUser = async (event) => {
		event.preventDefault();
		const userName = event.target.userName.value;
		const password = event.target.password.value;
		const displayName = event.target.displayName.value;

		const body = {
			userName: userName,
			password: password,
			displayName: displayName,
		};

		const url = '/account/signup';

		axiosInstance.post(url, body)
		.then(function (response) {
			console.log(response.data);
			router.push('/login');
		})
		.catch(function (error) {
			console.log(error);
		});	
	
	}

	const title = `${siteTitle} - Signup`;

	// Login page styles
	
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>

				<form onSubmit={submitUser}>
					<Grid align='center'>
						<Paper elevation={10} className={utilStyles.paperStyle}>
						<h1>Sign Up</h1>
							<TextField id="outlined-basic" label="E-mail" variant="outlined" placeholder='e.g. john@gmail.com' required/>
							<TextField id="outlined-basic" label="Password" variant="outlined" placeholder='At least 8 symbols' type='password' required/>
							<TextField id="outlined-basic" label="Confirm Password" variant="outlined" placeholder='At least 8 symbols' type='password' required/>

							<Stack>
								<Button type="submit" className={utilStyles.loginButton} variant="contained">SIGN UP</Button>
							</Stack>
							
						</Paper>
					</Grid>

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