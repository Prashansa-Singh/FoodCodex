import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
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
	const user = await session.user._id;
	const userId = user;


	// --------------- Single Restaurant Data -------------
	
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

	// --------------------- Saving shared restaurant ---------------------------

	const submitEdit = async (event) => {

		const body = {
			userId: userId,
			restaurantId: restaurantData._id,
			name: restaurantData.name,
			cuisine: restaurantData.cuisine,
			address: restaurantData.address,
			rating: restaurantData.rating,
			priceRating: restaurantData.priceRating,
			personalOption: restaurantData.personalOption,
			halalOption: restaurantData.halalOption,
			veganOption: restaurantData.veganOption,
			vegetarianOption: restaurantData.vegetarianOption,
			pescatarianOption:restaurantData.pescatarianOption,
			nutsFreeOption: restaurantData.nutsFreeOption,
			dairyFreeOption: restaurantData.dairyFreeOption,
			glutenFreeOption: restaurantData.glutenFreeOption,
			allergyFriendlyOption: restaurantData.allergyFriendlyOption,
			diabetesFriendlyOption: restaurantData.diabetesFriendlyOption,
		};

		const urlCreate = 'user/restaurant/create-one';
		
		await axiosInstance.post(urlCreate, body)
		.then(function (response) {
			console.log("in post, saveState is true, response.data " + response.data);
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
			<h1>
				Shared List
			</h1>
			<p>
				The Restaurant your friend shared with you.
			</p>
			<section className={utilStyles.headingMd}>
				<div className={styles.top}>
						<h1>
							{restaurantData.name}
						</h1>
						<div >
							<Button  className={shareStyles.saveButton} onClick={() => submitEdit()} >
								{/* <SaveAltIcon/> */}
								<span className={shareStyles.textButton}>Save</span>
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
			</section>
		</Layout>
	);
}

