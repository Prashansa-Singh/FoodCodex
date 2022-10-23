import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import Tags from '../../components/tags';
import Experiences from '../../components/experiences';
import PopupModal from "../../components/popupModal";
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-record.module.css';
import { axiosInstance } from '../api/axiosConfig';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useState } from 'react';
import Share from '../../components/share';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Material Ui
import * as React from 'react';
import { Rating, Modal, Box, Button, Typography } from "@mui/material";
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

	// const user = '6310521c744ac9f1587375fa';
	const user = await session.user._id;
	const url = '/user/restaurant/view-one'
	const response = await axiosInstance.get(url, { data: { userId: user, restaurantId: _id, } });
	console.log('response -->' + response);

	const restaurant_data = response.data;
	console.log('restaurant_data -->' + JSON.stringify(restaurant_data._id));
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

	console.log("1");

	// -------------------------- sharing --------------------------
	const [shareId, setShareId] = useState(null);
	const [shareURL, setShareURL] = useState(null);
	let shareLink;

	// const clickToShare = async() => {
		
	// 	const body = {
	// 		senderId: userId,
	// 		restaurantId: restaurant_data._id,
	// 		shareName: true,
	// 		shareRating: true,
	// 		sharePriceRating: true,
	// 		shareCuisine: true,
	// 		shareAddress: true,
	// 		shareOptionTags: true
	// 	};
		
	// 	console.log("2");
	// 	// has share id 
	// 	const URL = '/user/restaurant/share/generate-link';
	// 	await generateRestaurantShareLink(URL, body);
	
	// 	// present full share link
	// 	const baseURL = (process.env.NODE_ENV == "production") ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND : process.env.NEXT_PUBLIC_DEVELOPMENT_FRONTEND; //backend to frontend 
	// 	const midURL = "restaurant-collection/share-list?link=";
	// 	const connectionURL = "&_id=";
	// 	const midIdURL = userId;
	// 	const concatedURL = baseURL + midURL + shareLink + connectionURL + midIdURL; // works, but shareId is null for some reason ?? pending solve
	// 	setShareURL(concatedURL); // I think no need of setState since it's working? shareURL and concatedURL are the same restaurant but different link ??
	// 	console.log("concatedURL ---> " + concatedURL);
	// 	console.log("shareURL ---> " + shareURL);

	// }

	// const generateRestaurantShareLink = async (url, body) => {
	// 	await axiosInstance.post(url, body)
	// 	.then(function (response) {
	// 		shareLink = response.data;
	// 		console.log('3');
	// 		console.log(response.data);
	// 		console.log("sharelink --> " + shareLink);
	// 		setShareId(shareLink);
	// 		console.log("shareId --> " + shareId);
		
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});

	// }

	
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
					<h1>
						{restaurant_data.name}
					</h1>

					<div className={styles.icon_group}>

						<Share userId={userId} restaurant_data={restaurant_data} experiences={experiences}/>

						{/* <Button onClick={() => clickToShare()} title='Share Record' shareURL ={shareURL}>
							<a title='Share'> 
								<div className={styles.icons} >
									<img src='/src/nav-icons/share-icon.svg' width='40vw' alt='Share'/>
									
									<p className='white-space: normal width: 100px'> 
										Click to Share: {shareURL}
									</p>
								</div>
							</a>
						</Button> */}
						

						<div className={styles.icons}>
							<DeleteIcon className={styles.bin} onClick={() => confirmDelete()} />
							<p>Delete</p>
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
