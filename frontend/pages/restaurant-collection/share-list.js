import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import { useRef, useState } from 'react';
import { getSession } from "next-auth/react"

import * as React from 'react';
import {axiosInstance} from '../api/axiosConfig';
import Tags from '../../components/tags';
import { useRouter } from 'next/router';

// styles
import styles from '../../styles/view-restaurant-record.module.css';
import utilStyles from '../../styles/utils.module.css';
import shareStyles from '../../components/css/share.module.css';
import editStyles from '../../styles/edit-restaurant-record.module.css';
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

	// get user id
	const { _id } = context.query;
	// const user = '6310521c744ac9f1587375fa';
	const user = await session.user._id;
	const userId = user;


	// --------------- Single Restaurant Data -------------
	
	// get share link id
	const { link } = context.query;
	const url =  'user/restaurant/share/public/'
	const getDataConcatedURL = url + link;
	const response = await axiosInstance.get(getDataConcatedURL);
	let restaurantData = response.data;

	return {
	
		props: { link, restaurantData, userId }, 
	};
}



export default function ShareList({ link, restaurantData, userId}) {
	const title = `${siteTitle} - Share`;
	const router = useRouter();

	// --------------------- Presenting Sharing URLs ---------------------------

	// implement add function 
	const [saveState, setSaveState] = useState(false);
	const [value, setValue] = React.useState(restaurantData.rating);
	const [priceValue, setPriceValue] = React.useState(restaurantData.priceValue);

	const submitEdit = async (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const cuisine = event.target.cuisine.value;
		const address = event.target.address.value;

		const body = {
			userId: userId,
			restaurantId: restaurantData._id,
			name: (name != "") ? name : restaurantData.name,
			cuisine: (cuisine != "") ? cuisine : restaurantData.cuisine,
			address: (address != "") ? address : restaurantData.address,
			rating: value,
			priceRating: priceValue,
			personalOption: event.target.personalOption.value,
			halalOption: event.target.halalOption.value,
			veganOption: event.target.veganOption.value,
			vegetarianOption: event.target.vegetarianOption.value,
			pescatarianOption: event.target.pescatarianOption.value,
			nutsFreeOption: event.target.nutsFreeOption.value,
			dairyFreeOption: event.target.dairyFreeOption.value,
			glutenFreeOption: event.target.glutenFreeOption.value,
			allergyFriendlyOption: event.target.allergyFriendlyOption.value,
			diabetesFriendlyOption: event.target.diabetesFriendlyOption.value,
		};

		const url = 'user/restaurant/update-one';
		const urlCreate = 'user/restaurant/create-one';
		
		if (saveState){
			await axiosInstance.post(urlCreate, body)
			.then(function (response) {
				console.log("in post, saveState is true, response.data " + response.data);
				router.push('/restaurant-collection/view-restaurant-collection');
			})
			.catch(function (error) {
				console.log(error);
			});
		} else {
			await axiosInstance.post(url, body)
			.then(function (response) {
				console.log("in post, saveState is false, response.data  " + response.data);
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
				The Restaurant a human being shared with you.
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

					<Tags restaurant_data={restaurantData} page='view' />
					<br />
					
				</div>
				<br />
				<br />
				<br />
				
				{/* user decides to add the restaurant */}
				{saveState && (
						<>
						<form onSubmit={submitEdit}>
							<div className={shareStyles.formButtons}>
								<button type='submit' className={shareStyles.submitButton}><b>Save</b></button>
								<button type='button' className={shareStyles.discardButton} onClick={() => discard()}><b>Discard</b></button>	
							</div>
							<div className={editStyles.editFormTop}>
								<TextField 
									id="outlined-restaurant-name" 
									label="Restaurant Name" 
									variant="outlined" 
									name="name" 
									placeholder={restaurantData.name}
									defaultValue={restaurantData.name}
									required 
									margin="dense" 
									className={editStyles.textFields}
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
									className={editStyles.textFields}
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
								className={editStyles.address}
							/>
							<div className={shareStyles.editFormBottom}>
								<div className={shareStyles.picker}>
									<label> Rating (out of 5 stars): </label>
									<Rating precision={0.5} defaultValue={restaurantData.rating} onChange={(event, newValue) => { setValue(newValue) }} />
								</div>
								<div className={shareStyles.picker}>
									<label> Price Range: </label>
									<Rating icon={<PaidIcon />} emptyIcon={<PaidOutlinedIcon />} defaultValue={restaurantData.priceRating} onChange={(event, newPriceValue) => { setPriceValue(newPriceValue) }} />
								</div>
							</div>
							<br/>
							<label> Tags: </label>
							<Tags restaurant_data={restaurantData} page='edit' />
						</form>

						<div>
							<p>Note: Experiences can only be added, updated and deleted from the view restaurant page.</p>
						</div>
						<br/>
						<br/>
						<br/>
					</>
					
				)}
			</section>
		</Layout>
	);
}

