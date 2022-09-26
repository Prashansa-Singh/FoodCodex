import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/settings.module.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { axiosInstance } from '../api/axiosConfig';

export default function Settings() {
	const title = `${siteTitle} - Settings`;

	const confirmDelete = () => {

		const userId = '6310539f4af1428a18a7509d';
		
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
		await axiosInstance.delete(url, {data: body})
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
					<button onClick={() => confirmDelete()} className={styles.delete_button} >Delete All Restaurants</button>
				</div>
			</section>
		</Layout>
	);
}