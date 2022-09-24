import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import LoginButton from '../components/loginbutton';
import Button from '@mui/material/Button';

import {axiosInstance} from './api/axiosConfig';
import axios from 'axios';
import { useRouter } from 'next/router';

// Login Page Style
import React from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Stack } from '@mui/system';


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

	// Login page styles
	const paperStyle={padding :20,height:'70vh',width:280, margin:20, margin:'auto'}

	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>

			<section className={utilStyles.headingMd}>
				<Grid>
					<Paper elevation={10} style={paperStyle}>
						<h1>Login</h1>
						<TextField id="outlined-basic" label="Username" variant="outlined" placeholder='Enter username' required/>
						<TextField id="outlined-basic" label="Password" variant="outlined" placeholder='Enter password' type='password' required/>
						<Stack>
							<Button className={utilStyles.loginButton} variant="contained">LOGIN</Button>
						</Stack>
						
					</Paper>
				</Grid>
				
				<form onSubmit={submitUser}>
					<label> Enter a user name </label>
					<input type="text" placeholder="Username" name="userName" required/>
					<br/>

					<label> Set a password </label>
					<input type="password" placeholder="Password" name="password" required/>
					<br/>
					<Button className = {utilStyles.homepageButton} variant="contained" size="large">LOGIN</Button>
					{/* <input type="submit" className='loginButton' /> */}
				</form>
				<LoginButton />
			</section>
		</Layout>
	);
}
