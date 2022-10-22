import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { useRef, useState } from 'react';
import { getSession } from "next-auth/react"

import {axiosInstance} from '../api/axiosConfig';
import Link from 'next/link';
import Tags from '../../components/tags';
import { useRouter } from 'next/router';

// styles
import styles from '../../styles/view-restaurant-record.module.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

// converting circular structure 
import CircularJSON from 'circular-json'

// Material Ui and other decorations 
import { Rating, Modal, Box, Button, Typography, Grid, Paper, TextField, Stack } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { confirmAlert } from 'react-confirm-alert';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export async function getServerSideProps(context) {

	// --------------- authentication --------------------
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
	// const user = await session.user._id;

	
	// --------------- Single Restaurant Data -------------
	
	const url =  'user/restaurant/share/public/'
	const { link } = context.query;
	console.log("name in server " + link);
	const getDataConcatedURL = url + link;
	const response = await axiosInstance.get(getDataConcatedURL);
	let restaurantData = response.data;
	
	console.log("restaurantData type before" + typeof(restaurantData));
	console.log("restaurantData type after" + typeof(restaurantData));
	console.log("restaurantData after " + restaurantData);

	return {
	
		props: { link, restaurantData }, 
	};
}

// const customShareOptions = {
// 	shareName : true,
// 	shareRating : false,
// 	sharePriceRating : false,
// 	shareCuisine : false,
// 	shareAddress : false,
// 	shareOptionTags : false
	
// }


export default function ShareList({ link, restaurantData }) {
	const title = `${siteTitle} - Share`;
	const router = useRouter();

	const [shareId, setShareId] = useState(null);
	let shareLink;

	// // useState of customeShareOptions 
	// const [options, setOptions] = useState(customShareOptions);

	// // submitOptions, setOptions, Options indicator function
	// const submitOptions = (event) => {
	// 	event.preventDefault();
	// 	let updateShareName = {shareName: event.target.shareName.value === 'true'}
	// 	setOptions(options => ({
	// 		...options,
	// 		...updateShareName,
	// 	}));

	// 	optionsColorChange();

	// }

	// // optionsColorChange
	// const optionsColorChange = () => {
	// 	const icon = document.getElementById('filterIcon');
	// 	if (Object.values(options).includes(true)) {
	// 		icon.src = '/src/nav-icons/filter-icon.svg';
	// 	} else {
	// 		icon.src = '/src/nav-icons/filter-applied-icon.svg';
	// 	}
	// }

	// // cancelOptions
	// const cancelOptions = () => {
	// 	setOptions({ ...customShareOptions });
	// 	console.log(customShareOptions);
	// 	window.location.reload();
	// }

	// // openPopUp
	// const openPopUp = () => {
	// 	const elem = document.getElementById('filter');
	// 	elem.style.display = 'flex';
	// }
	// // closePopUp
	// const closePopUp = () => {
	// 	const elem = document.getElementById('filter');
	// 	elem.style.display = 'none';
	// }
	// // updateBody


	// const confirmShare = () => {
		
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

	// 	console.log("body "+ typeof(body));

	// 	const url = '/user/restaurant/share/generate-link';

	// 	confirmAlert({
	// 		title: 'Confirm to share',
	// 		message: 'Are you sure you wish to share this restaurant record?',
	// 		buttons: [
	// 		  {
	// 			label: 'Yes',
	// 			onClick: () => generateRestaurantShareLink(url, body),
	// 		  },
	// 		  {
	// 			label: 'No',
	// 		  }
	// 		]
	// 	});
	// } 

	// const generateRestaurantShareLink = async (url, body) => {
	// 	// try {
	// 	// 	const response = await axiosInstance.post()
	// 	// } catch(error) {
	// 	// }

		
	// 	await axiosInstance.post(url, body)
	// 	.then(function (response) {
	// 		shareLink = response.data;
	// 		setShareId(shareLink);
	// 		console.log("shareId --> " + shareId);
	// 		console.log(response.data);
	// 		console.log("sharelink --> " + shareLink);
	// 		//router.push('/restaurant-collection/shared-with-me');
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
	// }

	// --------------------- Presenting Sharing URLs ---------------------------
	

	console.log("5");
	console.log("data " + link);
	console.log("restaurant data type in share " + typeof(restaurantData));
	console.log("restaurant data in share " + restaurantData);

	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<h1>
				Shared List
			</h1>

			<p>
				The Restaurant a human being shared with you. For Debug: share is {link}
			</p>
			<section className={utilStyles.headingMd}>
				<div className={styles.top}>
						<h1>
							{restaurantData.name}
						</h1>

						<div className={styles.icon_group}>
							<div className={styles.icons}>
								<SaveAltIcon/>
								<p>Save</p>
							</div>
						</div>
				</div>

				<div className={styles.restaurant_details}>
					<p>
						<i>{restaurantData.cuisine}</i>
					</p>

					<p>
						<i>{restaurantData.address}</i>
					</p>
					<h5>Rating (out of 5 stars)</h5>
					<p>{<Rating name="read-only" value={restaurantData.rating} readOnly />}</p>

					<h5>Price Category</h5>
					<p>{<Rating icon={<PaidIcon />} emptyIcon={<PaidOutlinedIcon />} name="read-only" value={restaurantData.priceRating} readOnly />}</p>

					{/* <Tags restaurantData={restaurantData} page='view' /> */}
					<br />
					
				</div>
				<br />
				<br />
				<br />
				
			</section>
		</Layout>
	);
}

// getstaticprops return query with the share data, render it on the linkId page? 