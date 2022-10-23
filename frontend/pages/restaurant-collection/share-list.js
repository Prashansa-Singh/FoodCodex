import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { useRef, useState } from 'react';
import { getSession } from "next-auth/react"

import * as React from 'react';
import {axiosInstance} from '../api/axiosConfig';
import Link from 'next/link';
import Tags from '../../components/tags';
import { useRouter } from 'next/router';

// styles
import styles from '../../styles/view-restaurant-record.module.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

	// implement add function 
	const [saveState, setSaveState] = useState(false);

	const [value, setValue] = React.useState(restaurantData.rating);
	console.log("value " + value);

	const [priceValue, setPriceValue] = React.useState(restaurantData.priceValue);
	console.log("priceValue " + priceValue);

	const submitEdit = async (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const cuisine = event.target.cuisine.value;
		const address = event.target.address.value;

		const body = {
			// userId: userId,
			restaurantId: restaurantData._id,
			name: (name != "") ? name : restaurantData.name,
			cuisine: (cuisine != "") ? cuisine : restaurantData.cuisine,
			address: (address != "") ? address : restaurantData.address,
			rating: value,
			priceRating: priceValue,
			// personalOption: event.target.personalOption.value,
			// halalOption: event.target.halalOption.value,
			// veganOption: event.target.veganOption.value,
			// vegetarianOption: event.target.vegetarianOption.value,
			// pescatarianOption: event.target.pescatarianOption.value,
			// nutsFreeOption: event.target.nutsFreeOption.value,
			// dairyFreeOption: event.target.dairyFreeOption.value,
			// glutenFreeOption: event.target.glutenFreeOption.value,
			// allergyFriendlyOption: event.target.allergyFriendlyOption.value,
			// diabetesFriendlyOption: event.target.diabetesFriendlyOption.value,
		};

		const url = 'user/restaurant/update-one';
		const urlCreate = 'user/restaurant/create-one';
		
		if (saveState){
			await axiosInstance.post(urlCreate, body)
			.then(function (response) {
				console.log("response.data in saveState" + response.data);
				router.push('/restaurant-collection/view-restaurant-collection');
			})
			.catch(function (error) {
				console.log(error);
			});
		} else {
			await axiosInstance.post(url, body)
			.then(function (response) {
				console.log(response.data);
				router.push('/restaurant-collection/view-restaurant-collection');
			})
			.catch(function (error) {
				console.log(error);
			});
		}

	}
	
	const discard = () => {
		router.push('/restaurant-collection/view-restaurant-collection');
	}
	
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
							<Button onClick={() => setSaveState(true)} className={styles.icons} >
								<SaveAltIcon/>
								<p>Save</p>
							</Button>
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
				
				{/* user decides to add the restaurant */}
				{saveState && (
						<>
						<form onSubmit={submitEdit}>
							<div className={styles.button_container}>
								<button type='submit' className={styles.submitButton}><b>Save</b></button>
								<button type='button' className={styles.discardButton} onClick={() => discard()}><b>Discard</b></button>	
							</div>
							<div className={styles.editFormTop}>
								<TextField 
									id="outlined-restaurant-name" 
									label="Restaurant Name" 
									variant="outlined" 
									name="name" 
									placeholder={restaurantData.name}
									defaultValue={restaurantData.name}
									required 
									margin="dense" 
									className={styles.textFields}
								/>
								<TextField 
									id="outlined-restaurant-cuisine" 
									label="Type of Cuisine" 
									variant="outlined" 
									name="cuisine" 
									placeholder={restaurantData.cuisine}
									defaultValue={restaurantData.cuisine}
									required 
									margin="dense" 
									className={styles.textFields}
								/>
							</div>
							<TextField 
								id="outlined-restaurant-address" 
								label="Restaurant Address" 
								variant="outlined" 
								name="address" 
								placeholder={restaurantData.address}
								defaultValue={restaurantData.address}
								required 
								margin="dense" 
								className={styles.address}
							/>
							<div className={styles.editFormBottom}>
								<div className={styles.picker}>
									<label> Rating (out of 5 stars): </label>
									<Rating precision={0.5} defaultValue={restaurantData.rating} onChange={(event, newValue) => { setValue(newValue) }} />
								</div>
								<div className={styles.picker}>
									<label> Price Range: </label>
									<Rating icon={<PaidIcon />} emptyIcon={<PaidOutlinedIcon />} defaultValue={restaurantData.priceRating} onChange={(event, newPriceValue) => { setPriceValue(newPriceValue) }} />
								</div>
							</div>
							<br/>
							{/* <label> Tags: </label>
							<Tags restaurant_data={restaurant_data} page='edit' /> */}
						</form>
						<p>Note: Experiences can only be added, updated and deleted from the view restaurant page.</p>
						<br/>
						<br/>
						<br/>
					</>
					
				)}
				{!saveState &&(
					<h1>
						User did not choose to save 
					</h1>

				)}
			</section>
		</Layout>
	);
}

// getstaticprops return query with the share data, render it on the linkId page? 