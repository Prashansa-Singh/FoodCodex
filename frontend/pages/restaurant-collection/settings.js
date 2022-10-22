import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/settings.module.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { axiosInstance } from '../api/axiosConfig';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getSession, signOut } from "next-auth/react"

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	const userId = await session.user._id;
	
	const url = '/user/view-display-name';
	const displayNameResponse = await axiosInstance.get(url, { data: { userId: userId, } });
	const displayName = displayNameResponse.data;

	return {
		props: { userId, displayName },
	};
}

export default function Settings({ userId, displayName }) {
	const title = `${siteTitle} - Settings`;

	const confirmDelete = () => {

		const body = {
			userId: userId,
		};

		const url = 'user/restaurant/delete-all';

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you wish to delete all restaurant records from this account?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => deleteRestaurants(url, body),
				},
				{
					label: 'No',
				}
			]
		});
	}

	const deleteRestaurants = async (url, body) => {
		await axiosInstance.delete(url, { data: body })
			.then(function (response) {
				console.log(response.data);
				confirmAlert({
					title: 'Success',
					message: 'All of the restaurant records were successfully deleted.',
					buttons: [
						{
							label: 'Ok',
						}
					]
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const confirmAccountDeletion = () => {
		const body = {
			userId: userId,
		};

		const url = 'account/delete';

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you wish to delete your FoodCodex Account?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => deleteAccount(url, body),
				},
				{
					label: 'No',
				}
			]
		});
	}

	const deleteAccount = async (url, body) => {

		// Delete the account and clear local session
		await axiosInstance.delete(url, { data: body })
			.then(function (response) {
				console.log(response.data);
				confirmAlert({
					title: 'Success',
					message: 'Your Account Has Been Deleted',
					buttons: [
						{
							label: 'Ok',
							onClick: () => { signOut({ redirect: true, callbackUrl: '/' }) }
						}
					]
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const changeDisplayName = async (event) => {
		event.preventDefault();
		const newName = event.target.displayName.value;
		const url = '/user/update-display-name';
		const body = {
			userId: userId,
			displayName: newName,
		};
		await axiosInstance.post(url, body)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		})
	}

	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Settings
				</h1>
				<form onSubmit={changeDisplayName}>
					<TextField 
						id="outlined-restaurant-name" 
						label="Display Name" 
						variant="outlined" 
						name="displayName" 
						placeholder={displayName.displayName}
						defaultValue={displayName.displayName}
						required 
						margin="dense" 
						className={styles.textFields}
					/>
				</form>
				<br/>
				<br/>
				<div className={styles.button_container}>
					<Button
						onClick={() => confirmDelete()}
						variant="contained"
						color="error"
					>
						Delete All Restaurants
					</Button>

					<Button
						onClick={() => confirmAccountDeletion()}
						variant="contained"
						color="error"
					>
						Delete Account
					</Button>
				</div>
			</section>
		</Layout>
	);
}