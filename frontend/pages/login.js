import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../styles/login-signup.module.css';
import LoginButton from '../components/loginbutton';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { signIn, useSession } from "next-auth/react"

// Login Page Style
import React from 'react';
import { Typography, Button, Grid, Paper, TextField, Stack, Box } from '@mui/material';


export default function Login() {
	const router = useRouter();
	const { data: session } = useSession()

	// Redirect if user session detected
	useEffect(() => {
		if (session !== null && session !== undefined) {
			router.push('/restaurant-collection/view-restaurant-collection');
		}
	})

	const [error, setError] = useState(null)

	const errorStatus = {
		"CredentialsSignin": "Incorrect username or password, please try again",
		"Default": "Unknown error occured",
		"null": ""
	}

	const submitUser = async (event) => {
		event.preventDefault();

		const userName = event.target.userName.value;
		const password = event.target.password.value;

		let loginResponse = await signIn("mongodb-credentials", { username: userName, password: password, redirect: false })

		// Check for Login Errors
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
		<Layout homeOther>
			<Head>
				<meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
				<title>{title}</title>
			</Head>
 
			<section className={utilStyles.headingMdCenter}>
				<form onSubmit={submitUser}>
					<Grid align='center'>
						<Paper elevation={10} className={Styles.paperStyle}>
							{error != null && <h5>{error}</h5>}
							<h1>Login</h1>

							<TextField id="outlined-username" label="Username" variant="outlined" name="userName" placeholder='Enter username' required margin="dense" />
							<TextField id="outlined-password" label="Password" variant="outlined" name="password" placeholder='Enter password' type='password' required margin="dense" />

							<Box className={Styles.buttonContainer}>
								<Button className={Styles.loginButton} type="submit" variant="contained">LOGIN</Button>
								<Button className={Styles.newHereButton} variant="contained" href="/signup">New here?</Button>
							</Box>
						</Paper>
					</Grid>
				</form>
			</section>
		</Layout>
	);
}
