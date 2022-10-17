import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

import styles from '../../styles/view-restaurant-record.module.css';
import {axiosInstance} from '../api/axiosConfig';
import Link from 'next/link';
import Tags from '../../components/tags';
import Experiences from '../../components/experiences';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export async function getServerSideProps({query}) {

	const {_id} = query;
	const user = '6310521c744ac9f1587375fa';
	const url =  '/user/restaurant/view-one'
	const response = await axiosInstance.get(url, {data: {userId: user, restaurantId: _id,}});

	const restaurant_data = response.data;
	const userId = user;

	const experiences_data = (await axiosInstance.get('user/restaurant/experience/view-all', {data: {restaurantId: _id,}}));
	const experiences = experiences_data.data;
	return {
		props: {userId, restaurant_data, experiences},
	};
}


export default function ShareList({userId, restaurant_data, experiences}) {
	const title = `${siteTitle} - Share`;
	const router = useRouter();
	// console.log(restaurant_data);
	console.log(restaurant_data._id);

	const confirmShare = () => {
		
		const body = {

			restaurantId: restaurant_data._id,
		};

		const url = '/user/restaurant/share/generate-link';

		confirmAlert({
			title: 'Confirm to share',
			message: 'Are you sure you wish to share this restaurant record?',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => generateRestaurantShareLink(url, body),
			  },
			  {
				label: 'No',
			  }
			]
		});
	} 

	const generateRestaurantShareLink = async (url, body) => {
		// try {
		// 	const response = await axiosInstance.post()
		// } catch(error) {
			
		// }

		// console.log({body});
		await axiosInstance.post(url, {data: body})
		.then(function (response) {
			console.log(response.data);
			router.push('/restaurant-collection/share-list');
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
					Share My List
				</h1>

				<p>
					Page where users can share records
				</p>

				<div className={styles.button_container}>
					<button onClick={() => confirmShare()} className={styles.delete_button} >Share Restaurant</button>
				</div>
			</section>
		</Layout>
	);
}