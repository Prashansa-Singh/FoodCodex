import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

import {axiosInstance} from '../api/axiosConfig';

export async function getServerSideProps({query}) {

	const {_id} = query;
	const url = '/getRestaurant/' + _id; // URL for the GET request to backend
	console.log(url);
	//const response = await axiosInstance.get(url);
	//const restaurant_data = response.data;

	return {
		props: {_id,},
	};
}

export default function ViewRestaurantRecord({restaurant_data}) {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					View Restaurant Record
				</h1>

				<p>
					Page displaying single restaurant record
				</p>
			</section>
		</Layout>
	);
}