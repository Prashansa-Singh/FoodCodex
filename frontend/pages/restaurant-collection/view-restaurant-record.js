import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-record.module.css';
import {axiosInstance} from '../api/axiosConfig';
import Link from 'next/link';
import Tags from '../../components/tags';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export async function getServerSideProps({query}) {

	const {_id} = query;
	const user = '6310521c744ac9f1587375fa';
	const url =  '/user/restaurant/view-one'
	const response = await axiosInstance.get(url, {data: {userId: user, restaurantId: _id,}});

	const restaurant_data = response.data;

	return {
		props: {restaurant_data,},
	};
}

export default function ViewRestaurantRecord({restaurant_data}) {
	const title = `${siteTitle} - ${restaurant_data.name}`;

	const router = useRouter();

	const confirmDelete = () => {
		
		const body = {
			restaurantId: restaurant_data._id,
		};

		const url = 'user/restaurant/delete-one';

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you wish to delete this restaurant record?',
			buttons: [
			  {
				label: 'Yes',
				onClick: () => deleteRestaurant(url, body),
			  },
			  {
				label: 'No',
			  }
			]
		});
	}

	const deleteRestaurant = async (url, body) => {
		await axiosInstance.delete(url, {data: body})
		.then(function (response) {
			console.log(response.data);
			router.push('/restaurant-collection/view-restaurant-collection');
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
						<Link href='/restaurant-collection/edit-restaurant-record'>
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
				</div>

				<div className={styles.view_record_container}>
					<div className={`${styles.data_container} ${styles.data1}`}>
						<h5>Rating (out of 5 stars)</h5>
						<p>{restaurant_data.rating}</p>
					</div>

					<div className={`${styles.data_container} ${styles.data2}`}>
						<h5>Price Category</h5>
						<p>{restaurant_data.priceRating}</p>
					</div>

					<div className={`${styles.data_container} ${styles.data3}`}>
						<h5>Experiences</h5>
					</div>

					<div className={`${styles.data_container} ${styles.data4}`}>
						<h5>Tags</h5>
						<Tags restaurant_data={restaurant_data} />
					</div>
				</div>
				<br />
				<div className={styles.button_container}>
					<button onClick={() => confirmDelete()} className={styles.delete_button} >Delete Restaurant</button>
				</div>
				<br />
				<br />
				<br />
			</section>
		</Layout>
	);
}