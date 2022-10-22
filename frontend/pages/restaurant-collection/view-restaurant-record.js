import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-record.module.css';
import { axiosInstance } from '../api/axiosConfig';
import Link from 'next/link';
import Tags from '../../components/tags';
import Experiences from '../../components/experiences';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';


import { Rating } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

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
	const [shareId, setShareId] = useState(null);
	const [rId, setRId] = useState(null);
	const [restaurantSharedData, setSharedData] = useState(null);
	const [aname, setAname] = useState(null);
	let shareLink;
	console.log("1");

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

	const clickToShare = async() => {
		
		const body = {
			senderId: userId,
			restaurantId: restaurant_data._id,
			shareName: true,
			shareRating: true,
			sharePriceRating: true,
			shareCuisine: true,
			shareAddress: true,
			shareOptionTags: true
		};
		
		console.log("2");
		// has share id 
		const URL = '/user/restaurant/share/generate-link';
		await generateRestaurantShareLink(URL, body);
	
		// has shared restaurant data 
		const viewURL = '/user/restaurant/share/public/'
		const concatedURL = viewURL + shareLink;
		console.log("concatedURL ---> " + concatedURL);
		await getSharedRestaurantData(concatedURL);

		// await router.push({
		// 	pathname: '/restaurant-collection/share-list', 
		// 	// query: { data: JSON.stringify(aname) },
		// 	query: { name: "Hi" },

		// })

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

	
	const generateRestaurantShareLink = async (url, body) => {
	 
		await axiosInstance.post(url, body)
		.then(function (response) {
			shareLink = response.data;
			console.log('3');
			console.log(response.data);
			console.log("sharelink --> " + shareLink);
			setShareId(shareLink);
			console.log("shareId --> " + shareId);
			//router.push('/restaurant-collection/shared-with-me');
		})
		.catch(function (error) {
			console.log(error);
		});

	}
	
	const getSharedRestaurantData = async (concatedURL) => {
		console.log('4');
		const response = await axiosInstance.get(concatedURL);

		console.log("getSharedRestaurantData's response" + JSON.stringify(response));
		setSharedData(response);
		const stringfyResponse = JSON.stringify(response.data.name);
		setAname(stringfyResponse);
		const {name} = response;
		console.log("name out" + stringfyResponse);
		// console.log("name out" + stringfyResponse.data.name);
	
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
						{/* <Link> */}
							<a  onClick={() => clickToShare()}> 
								<div className={styles.icons}>
									<img src='/src/nav-icons/share-icon.svg' width='40vw' />
									<p>Share

										share link is here: http://localhost:3000/restaurant-collection/share-list?name=633e130ef0a48a106f5d0463
									</p>
								</div>
							</a>
						{/* </Link> */}
						<Link href={{ pathname: '/restaurant-collection/edit-restaurant-record', query: { _id: userId, rest_id: restaurant_data._id } }}>
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
					<p>{<Rating name="read-only" value={restaurant_data.rating} readOnly />}</p>

					<h5>Price Category</h5>
					<p>{<Rating icon={<PaidIcon />} emptyIcon={<PaidOutlinedIcon />} name="read-only" value={restaurant_data.priceRating} readOnly />}</p>

					<Tags restaurant_data={restaurant_data} page='view' />
					<br />
					<Experiences experiences={experiences} id={restaurant_data._id} />
				</div>
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
