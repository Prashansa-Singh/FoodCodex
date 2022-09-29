import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../components/css/login-signup.module.css';
import LoginButton from '../components/loginbutton';


import { axiosInstance } from './api/axiosConfig';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { signIn } from "next-auth/react"

// Login Page Style
import React from 'react';
import { Typography, Button, Grid, Paper, TextField, Stack, Box } from '@mui/material';


export default function Login() {
	const [error, setError] = useState(null)

	// const router = useRouter();

	const errorStatus = {
		"CredentialsSignin": "Incorrect username or password, please try again",
		"Default": "Unknown error occured",
		"null": ""
	}

	const submitUser = async (event) => {
		event.preventDefault();

		const userName = event.target.userName.value;
		const password = event.target.password.value;

		// console.log(`${userName} and ${password}`)

		let loginResponse = await signIn("mongodb-credentials", { username: userName, password: password, redirect: false })

		// console.log(loginResponse)

		let errorCode = null;
		if (loginResponse) {
			errorCode = loginResponse.error

			if (errorStatus[errorCode] !== undefined) {
				setError(errorStatus[errorCode])
			}
			else {
				setError(errorStatus["Default"])
			}
		}

		// reset form details
		event.target.userName.value = '';
		event.target.password.value = '';
	}

	const title = `${siteTitle} - Login`;

	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>

			<section className={utilStyles.headingMd}>
				<form onSubmit={submitUser}>
					<Grid align='center'>

						<Paper elevation={10} className={Styles.paperStyle}>
							{error != null && <h5>{error}</h5>}
							<h1>Login</h1>

							<TextField id="outlined-username" label="Username" variant="outlined" name="userName" placeholder='Enter username' required margin="dense" />
							<TextField id="outlined-password" label="Password" variant="outlined" name="password" placeholder='Enter password' type='password' required margin="dense" />

							<Box>
								<Button type="submit" className={Styles.loginButton} variant="contained">LOGIN</Button>
							</Box>

							<Button variant="contained" href="/signup">New here?</Button>

						</Paper>
					</Grid>
				</form>
				<LoginButton />
			</section>
		</Layout>
	);
}
