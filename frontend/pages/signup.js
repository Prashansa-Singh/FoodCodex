import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../components/css/login-signup.module.css';

import {axiosInstance} from './api/axiosConfig';
import { useRouter } from 'next/router';

import React from 'react'
import { Typography, Box, Button, Grid, Paper, TextField, Stack } from '@mui/material';

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
	
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>

				<form onSubmit={submitUser}>
					<Grid align='center'>

						<Paper elevation={10} className={Styles.paperStyle}>
							<h1>Sign Up</h1>

							<TextField  label="E-mail" variant="outlined" placeholder='e.g. john@gmail.com' required margin="dense"/>
							<TextField  label="Password" variant="outlined" placeholder='At least 8 symbols' type='password' required margin="dense"/>
							<TextField id="outlined-basic" label="Confirm Password" variant="outlined" placeholder='At least 8 symbols' type='password' required margin="dense"/>

							<Box>
								<Button type="submit" className={Styles.loginButton} variant="contained">SIGN UP</Button>
							</Box>
							
						</Paper>
					</Grid>
{/* 
					<label> Enter a user name </label>
					<input type="text" placeholder="Username" name="userName" required/>
					<br/>

					<label> Set a password </label>
					<input type="password" placeholder="Password" name="password" required/>
					<br/>

					<label> Choose a display name </label>
					<input type="text" placeholder="Display Name" name="displayName" required/>
					<br/>
					
					<input type="submit"/> */}
				</form>
			</section>
		</Layout>
	);
}