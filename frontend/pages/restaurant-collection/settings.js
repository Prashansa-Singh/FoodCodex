import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/settings.module.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { axiosInstance } from '../api/axiosConfig';
import Button from '@mui/material/Button';

import { getSession, signOut } from "next-auth/react"
import { Router } from 'next/router';

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
	// console.log(userId)

	return {
		props: { userId },
	};
}

export default function Settings({ userId }) {
	const title = `${siteTitle} - Settings`;

	const confirmDelete = () => {

		// const userId = '6310539f4af1428a18a7509d';

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

	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Settings
				</h1>
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