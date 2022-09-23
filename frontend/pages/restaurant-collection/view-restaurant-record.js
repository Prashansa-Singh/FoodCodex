import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-record.module.css';
import {axiosInstance} from '../api/axiosConfig';
import Link from 'next/link';
import Tags from '../../components/tags';
import Experiences from '../../components/experiences';

export async function getServerSideProps({query}) {

	const {_id} = query;
	const user = '6310521c744ac9f1587375fa';
	const url =  '/user/restaurant/view-one'
	const response = await axiosInstance.get(url, {data: {userId: user, restaurantId: _id,}});

	const restaurant_data = response.data;
	const userId = user;

	const experiences_data = await (await axiosInstance.get('user/restaurant/experience/view-all', {data: {restaurantId: _id,}}));
	const experiences = experiences_data.data;
	return {
		props: {userId, restaurant_data, experiences},
	};
}

export default function ViewRestaurantRecord({userId, restaurant_data, experiences}) {
	const title = `${siteTitle} - ${restaurant_data.name}`;
	console.log(experiences[0])
	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<div className={styles.top}>	
					<h1>
						{restaurant_data.name}
					</h1>
					<div className={styles.icon_group}>
						<Link href='/restaurant-collection/share-list'>
							<a>
								<div className={styles.icons}>
									<img src='/src/nav-icons/share-icon.svg' width='40vw' />
									<p>Share</p>
								</div>
							</a>
                        </Link>
						<Link href={{pathname: '/restaurant-collection/edit-restaurant-record', query: {_id: userId, rest_id: restaurant_data._id}}}>
							<a>
								<div className={styles.icons}>
									<img src='/src/nav-icons/add-edit-nav-icon.svg' width='40vw' />
									<p>Edit</p>
								</div>
							</a>
						</Link>
					</div>
				</div>

				<div className={styles.restaurant_details}>
					<p>
						<i>{restaurant_data.cuisine}</i>
					</p>

					<p>
						<i>{restaurant_data.address}</i>
					</p>
					<h5>Rating (out of 5 stars)</h5>
					<p>{restaurant_data.rating}</p>
					<h5>Price Category</h5>
					<p>{restaurant_data.priceRating}</p>
					<Tags restaurant_data={restaurant_data} page='view' />
					<br />
					<Experiences experiences={experiences} />	
				</div>
				<br />
				<br />
				<br />								
			</section>
		</Layout>
	);
}