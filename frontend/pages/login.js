import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../components/css/login-signup.module.css';
import LoginButton from '../components/loginbutton';

import {axiosInstance} from './api/axiosConfig';
import { useRouter } from 'next/router';

// Login Page Style
import React from 'react';
import { Typography, Button, Grid, Paper, TextField, Stack, Box } from '@mui/material';


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
				<form onSubmit={submitUser}>
					<Grid align='center'>

						<Paper elevation={10} className={Styles.paperStyle}>
							<h1>Login</h1>

							<TextField id="outlined-basic" label="Username" variant="outlined" placeholder='Enter username' required margin="dense"/>
							<TextField id="outlined-basic" label="Password" variant="outlined" placeholder='Enter password' type='password' required margin="dense"/>
							
							<Box>
								<Button type="submit" className={Styles.loginButton} variant="contained">LOGIN</Button>
							</Box>

							<Typography> New here? </Typography>

						</Paper>
					</Grid>
					
					{/* <label> Enter a user name </label>
					<input type="text" placeholder="Username" name="userName" required/>
					<br/>

					<label> Set a password </label>
					<input type="password" placeholder="Password" name="password" required/>
					<br/>
					<Button className = {utilStyles.homepageButton} variant="contained" size="large">LOGIN</Button> */}
					{/* <input type="submit" className='loginButton' /> */}
				</form>
				<LoginButton />
			</section>
		</Layout>
	);
}
