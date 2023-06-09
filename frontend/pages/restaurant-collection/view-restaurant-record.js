import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import Tags from '../../components/tags';
import Experiences from '../../components/experiences';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-record.module.css';
import { axiosInstance } from '../api/axiosConfig';
import Link from 'next/link';

import { useRouter } from 'next/router';
import Share from '../../components/share';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Material Ui
import * as React from 'react';
import { Rating } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import { getSession } from "next-auth/react"

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
 
	const { _id } = context.query;

	const user = await session.user._id;
	const url = '/user/restaurant/view-one'
	const response = await axiosInstance.get(url, { data: { userId: user, restaurantId: _id, } });

	const restaurant_data = response.data;
	const userId = user;

	const experiences_data = (await axiosInstance.get('user/restaurant/experience/view-all', { data: { restaurantId: _id, } }));
	const experiences = experiences_data.data;
	return {
		props: { userId, restaurant_data, experiences },
	};
}


export default function ViewRestaurantRecord({ userId, restaurant_data, experiences }) {
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
		await axiosInstance.delete(url, { data: body })
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
					<h1> { restaurant_data.name } </h1>
					<div className={styles.icon_group}>
						<Share userId={userId} restaurant_data={restaurant_data} experiences={experiences}/>
						<div className={styles.icons}>
							<img src='/src/nav-icons/bin-icon.svg' width='40vw' alt='Bin' onClick={() => confirmDelete()} />
							<p onClick={() => confirmDelete()}>Delete</p>
						</div>

						<Link href={{ pathname: '/restaurant-collection/edit-restaurant-record', query: { _id: userId, rest_id: restaurant_data._id } }} title='Edit Record'>
							<a title='Edit'>
								<div className={styles.icons}>
									<img src='/src/nav-icons/add-edit-nav-icon.svg' width='40vw' alt='Edit' />
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
					<p>{<Rating name="read-only" value={restaurant_data.rating} readOnly />}</p>

					<h5>Price Category</h5>
					<p>{<Rating icon={<PaidIcon />} emptyIcon={<PaidOutlinedIcon />} name="read-only" value={restaurant_data.priceRating} readOnly />}</p>

					<Tags restaurant_data={restaurant_data} page='view' />
					<br />
					<Experiences experiences={experiences} id={restaurant_data._id} />
				</div>
				<br />
				<br />
				<br />
			</section>
		</Layout>
	);
}
