import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { useRef, useState } from 'react';
import { getSession } from "next-auth/react"

import styles from '../../styles/view-restaurant-record.module.css';
import {axiosInstance} from '../api/axiosConfig';
import Link from 'next/link';
import Tags from '../../components/tags';
import Experiences from '../../components/experiences';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import { Typography, Button, Grid, Paper, TextField, Stack, Box } from '@mui/material';
import 'react-confirm-alert/src/react-confirm-alert.css';


// export async function getServerSideProps({query}) {

// 	// // --------------- Single Restaurant Data -------------
// 	// const user = '6310521c744ac9f1587375fa';
// 	// const url =  '/user/restaurant/view-one'
// 	const { name } = query;
// 	// const response = await axiosInstance.get(url, {data: {userId: user,}});
// 	// const restaurant_data = response.data;
// 	// const userId = user;

// 	// const experiences_data = (await axiosInstance.get('user/restaurant/experience/view-all', {data: {restaurantId: rest_id,}}));
// 	// const experiences = experiences_data.data;

// 	// ------------- Share id ---------------- post restId to get shareId, put shareId in get request to get sharedRestaurantdata, pass this restaurantdata to linkId.js using Link href, query, render restaurantData in linkId page by having getServerSideProps get the url. If I want to add restaurant data, call post API, restaurant data in body to add that in restaurant collection. router.push(viewrestaurantcollection)
// 	// if same share at once, might crash, at the start, id is empty, thenignore, from second time onwards, get the restaurantdata by using viewRestaurantRouter in the backend,

// 	// const resShare = await axiosInstance.get('user/restaurant/share/public' + id);
	
// 	console.log("name inside server props" + JSON.stringify(name));
// 	return {
// 		// props: {userId, restaurant_data, experiences},
// 		props: { name },
// 	};
// }

// const customShareOptions = {
// 	shareName : true,
// 	shareRating : false,
// 	sharePriceRating : false,
// 	shareCuisine : false,
// 	shareAddress : false,
// 	shareOptionTags : false
	
// }


export default function ShareList({ query }) {
	const title = `${siteTitle} - Share`;
	const router = useRouter();
	const {name} = router.query;
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
	const baseURL = (process.env.NODE_ENV == "production") ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND : process.env.NEXT_PUBLIC_DEVELOPMENT_FRONTEND; //backend to frontend 
	const midURL = "user/restaurant/share/public/";
	const shareURL = baseURL + midURL + shareId;

	console.log("4");

	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Share My List
				</h1>

				<p>
					Page where users can share records
				</p>

				<div> { name } </div>

				{/* <div className={styles.button_container}>
					<button onClick={() => confirmShare()} className={styles.delete_button} >Share Restaurant</button>
				</div> */}

				{/* <Box>
					Here is your link: 
					<Link href={shareURL}>
						<Paper>		
							
							Click to Direct : {shareURL}
						</Paper>
					</Link>

				</Box> */}

				{/* <div className={styles.filter}>
						<img className={styles.icon} src='/src/nav-icons/filter-icon.svg' alt='Filter Icon' onClick={openPopUp} id='filterIcon' />
						<div className={styles.filter_options} id='filter'>
							<p className={styles.close} onClick={closePopUp}>&#10006;</p>
							<form onSubmit={submitOptions}>
								<div restaurant_data={customShareOptions} page='edit' />
								<div className={styles.button_container}>
									<input type='submit' value='Apply' />
									<button type='button' onClick={() => cancelOptions()}>Discard</button>
								</div>
							</form>
						</div>
					</div> */}
			</section>
		</Layout>
	);
}

// getstaticprops return query with the share data, render it on the linkId page? 