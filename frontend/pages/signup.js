import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../styles/login-signup.module.css';

import { axiosInstance } from './api/axiosConfig';
import { useRouter } from 'next/router';

import React, { useState } from 'react'
import { Typography, Box, Button, Grid, Paper, TextField, Stack } from '@mui/material';

export default function Signup() {

	const title = `${siteTitle} - Signup`;
	const router = useRouter();

	const submitUser = async (event) => {
		event.preventDefault();
		const userName = event.target.userName.value;
		const password = event.target.password.value;

		const body = {
			userName: userName,
			password: password,
			displayName: userName,
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

	const [validPassword, setValidPassword] = useState({ passwordLen: 0 });

	const checkUsername = async (event) => {
		event.preventDefault();

        const url = '/account/is-username-taken';

		const body = {
			userName: event.target.userName.value,
		}

		await axiosInstance.post(url, body)
		.then(function (response) {
			console.log(response.data);
			if (response.data == true) { 
				setUniqueUsername(false);
			} else {
				setUniqueUsername(true);
				submitUser(event);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}


	const isValidPassword = () => {
		if (validPassword.passwordLen >= 8) {
			return true;
		}
		return false;
	}

	const [validConfirm, setValidConfirm] = useState({ password: "", confirm: "" });

	const isValidConfirm = () => {
		if (validConfirm.password === validConfirm.confirm) {
			return true;
		}
		return false;
	}

	const checkValid = () => {
		if (isValidPassword() && isValidConfirm()) {
			return true;
		}
		return false;
	}

	const [uniqueUsername, setUniqueUsername] = useState(true);

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
				<form onSubmit={checkUsername}>
					<Grid align='center'>

						<Paper className={Styles.paperStyle}>
							<h1>Sign Up</h1>

							<TextField
								name='userName'
								label="Username"
								variant="outlined"
								placeholder='e.g. johnsmith1'
								margin="dense"
								error={!uniqueUsername}
								helperText={!uniqueUsername ? "This username is taken" : ""}
								required 
							/>
							<TextField
								name='password'
								label="Password"
								variant="outlined"
								placeholder='At least 8 symbols'
								type='password'
								margin="dense"
								error={!isValidPassword()}
								helperText={!isValidPassword() ? "Password must be at least 8 characters" : ""}
								onChange={event => { setValidPassword({ passwordLen: event.target.value.length }); setValidConfirm({ password: event.target.value, confirm: validConfirm.confirm }); }}
								required
							/>
							<TextField
								name='confirmPassword'
								id="outlined-basic"
								label="Confirm Password"
								variant="outlined"
								placeholder='At least 8 symbols'
								type='password'
								margin="dense"
								error={!isValidConfirm()}
								helperText={!isValidConfirm() ? "Password mismatch" : ""}
								onChange={event => setValidConfirm({ password: validConfirm.password, confirm: event.target.value })}
								required
							/>

							<Box>
								{
									checkValid()
										? <Button type="submit" className={Styles.loginButton} variant="contained">SIGN UP</Button>
										: <Button disabled type="submit" className={Styles.loginButton} variant="contained">SIGN UP</Button>}
							</Box>

						</Paper>
					</Grid>
				</form>
			</section>
		</Layout>
	);
}