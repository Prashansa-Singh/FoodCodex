import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {axiosInstance} from '../api/axiosConfig';

export async function getServerSideProps({query}) {

	const {_id} = query;
	let restaurant_data;
	let new_data;

	if (_id == undefined) {
		restaurant_data = {}
		new_data = true;
	} else {
		const url =  '/user/restaurant/6310521c744ac9f1587375fa/view-one'
		const response = await axiosInstance.get(url, {data: {restaurantId: _id,}});
        restaurant_data = response.data;
		new_data = false;
	}

	return {
		props: {restaurant_data, new_data,},
	};
}

export default function EditRestaurantRecord({restaurant_data, new_data}) {

	const title = `${siteTitle} - Edit Restaurant`;

	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<>
					{new_data && (
						<>
							<h1>
								Add Restaurant Record
							</h1>
							<p>
								Add a restaurant record
							</p>
						</>
					)}
					{!new_data && (
						<>
							<h1>
								Edit Restaurant Record
							</h1>
							<p>
								Edit a restaurant record
							</p>
						</>
					)}
				</>
			</section>
		</Layout>
	);
}