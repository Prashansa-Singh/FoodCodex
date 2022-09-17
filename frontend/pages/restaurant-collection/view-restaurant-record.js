import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

import {axiosInstance} from '../api/axiosConfig';
import axios from 'axios';

export async function getServerSideProps({query}) {

	const {_id} = query;
	const url = '/getRestaurant'; // URL for the GET request to backend
	const response = await axiosInstance.get(url, {data: {restaurantId: _id,}});

	const restaurant_data = response.data;

	return {
		props: {restaurant_data,},
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
					{restaurant_data.name}
				</h1>

				<p>
					Page displaying single restaurant record
				</p>
			</section>
		</Layout>
	);
}