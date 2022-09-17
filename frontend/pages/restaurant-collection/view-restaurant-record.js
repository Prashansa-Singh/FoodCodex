import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-record.module.css';
import {axiosInstance} from '../api/axiosConfig';

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
				<title>{siteTitle} - {restaurant_data.name}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<div>
					<div>
						<img src='/src/nav-icons/share-icon.svg' />
						<p>Share</p>
					</div>
					<div>
						<img src='/src/nav-icons/add-edit-nav-icon.svg' />
						<p>Edit</p>
					</div>
				</div>

				<h1>
					{restaurant_data.name}
				</h1>

				<p>
					<i>{restaurant_data.cuisine}</i>
				</p>

				<p>
					<i>{restaurant_data.address}</i>
				</p>

				<div>
					<h5>Rating (out of 5 stars)</h5>
					<p>{restaurant_data.rating}</p>
				</div>

				<div>
					<h5>Price Category</h5>
					<p>{restaurant_data.priceRating}</p>
				</div>

				<div>
					<h5>Tags</h5>
				</div>

				<div>
					<h5>Experiences</h5>
				</div>

			</section>
		</Layout>
	);
}