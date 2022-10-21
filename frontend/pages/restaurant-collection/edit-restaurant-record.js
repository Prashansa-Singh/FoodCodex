import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/edit-restaurant-record.module.css'
import { axiosInstance } from '../api/axiosConfig';
import { useRouter } from 'next/router';
import Tags from '../../components/tags';

import { Rating } from "@mui/material";
import * as React from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import TextField from '@mui/material/TextField';

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

	// const { _id, rest_id } = query;
	const _id = await session.user._id;
	const { rest_id } = context.query;

	let restaurant_data;
	let new_data;
	let userId = _id;

	if (rest_id == undefined) {
		restaurant_data = {}
		new_data = true;
		// userId = '6310521c744ac9f1587375fa';
	} else {
		const url = '/user/restaurant/view-one'
		const response = await axiosInstance.get(url, { data: { userId: userId, restaurantId: rest_id, } });
		restaurant_data = response.data;
		new_data = false;
	}

	return {
		props: { userId, restaurant_data, new_data, },
	};
}

export default function EditRestaurantRecord({ userId, restaurant_data, new_data }) {
	const title = `${siteTitle} - Edit Restaurant`;

	const router = useRouter();

	// Ratings method 2
	const [value, setValue] = React.useState(restaurant_data.rating);
	console.log(value);

	const [priceValue, setPriceValue] = React.useState(restaurant_data.priceValue);
	console.log(priceValue);

	const submitEdit = async (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const cuisine = event.target.cuisine.value;
		const address = event.target.address.value;

		const body = {
			userId: userId,
			restaurantId: restaurant_data._id,
			name: (name != "") ? name : restaurant_data.name,
			cuisine: (cuisine != "") ? cuisine : restaurant_data.cuisine,
			address: (address != "") ? address : restaurant_data.address,
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
		
		if (new_data){
			await axiosInstance.post(urlCreate, body)
			.then(function (response) {
				console.log(response.data);
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
			<section className={utilStyles.headingMd}>
				<>
					{new_data && (
						<>
							<h1>
								Add Restaurant Record
							</h1>
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
										placeholder="Restaurant Name"
										required 
										margin="dense" 
										className={styles.textFields}
									/>
									<TextField 
										id="outlined-restaurant-cuisine" 
										label="Type of Cuisine" 
										variant="outlined" 
										name="cuisine" 
										placeholder="Type of Cuisine"
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
									placeholder="Restaurant Address"
									required 
									margin="dense" 
									className={styles.address}
								/>
								<div className={styles.editFormBottom}>
									<div className={styles.picker}>
										<label> Rating (out of 5 stars): </label>
										<Rating precision={0.5} onChange={(event, newValue) => { setValue(newValue) }} />
									</div>
									<div className={styles.picker}>
										<label> Price Range: </label>
										<Rating icon={<PaidIcon />} emptyIcon={<PaidOutlinedIcon />} onChange={(event, newPriceValue) => { setPriceValue(newPriceValue) }} />
									</div>
								</div>
								<br/>
								<label> Tags </label>
								<Tags restaurant_data={restaurant_data} page='edit' />
							</form>

						</>
					)}
					{!new_data && (
						<>
							<h1>
								Edit Restaurant Record
							</h1>
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
										placeholder={restaurant_data.name}
										defaultValue={restaurant_data.name}
										required 
										margin="dense" 
										className={styles.textFields}
									/>
									<TextField 
										id="outlined-restaurant-cuisine" 
										label="Type of Cuisine" 
										variant="outlined" 
										name="cuisine" 
										placeholder={restaurant_data.cuisine}
										defaultValue={restaurant_data.cuisine}
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
									placeholder={restaurant_data.address}
									defaultValue={restaurant_data.address}
									required 
									margin="dense" 
									className={styles.address}
								/>
								<div className={styles.editFormBottom}>
									<div className={styles.picker}>
										<label> Rating (out of 5 stars): </label>
										<Rating precision={0.5} defaultValue={restaurant_data.rating} onChange={(event, newValue) => { setValue(newValue) }} />
									</div>
									<div className={styles.picker}>
										<label> Price Range: </label>
										<Rating icon={<PaidIcon />} emptyIcon={<PaidOutlinedIcon />} defaultValue={restaurant_data.priceRating} onChange={(event, newPriceValue) => { setPriceValue(newPriceValue) }} />
									</div>
								</div>
								<br/>
								<label> Tags: </label>
								<Tags restaurant_data={restaurant_data} page='edit' />
							</form>
						</>
					)}
				</>

				<style jsx>{`
					.selected_tag {
						color: #24B25C;
					}
				`}</style>
			</section>
		</Layout>
	);
}