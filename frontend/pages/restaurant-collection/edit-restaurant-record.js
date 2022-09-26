import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {axiosInstance} from '../api/axiosConfig';
import { useRouter } from 'next/router';
import Tags from '../../components/tags';

import { Rating } from "@mui/material";
import * as React from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import priceIconComp from './Price-icon-component/price-icon-comp';

// import { useState } from 'react';
// import Rating from "./Rating/rating";
// import Price from "./Price/rating";


export async function getServerSideProps({query}) {

	const {_id, rest_id} = query;
	let restaurant_data;
	let new_data;
	let userId = _id;

	if (rest_id == undefined) {
		restaurant_data = {}
		new_data = true;
		userId = '6310521c744ac9f1587375fa';
	} else {
		const url =  '/user/restaurant/view-one'
		const response = await axiosInstance.get(url, {data: {userId: userId, restaurantId: rest_id,}});
        restaurant_data = response.data;
		new_data = false;
	}

	return {
		props: {userId, restaurant_data, new_data,},
	};
}

export default function EditRestaurantRecord({userId, restaurant_data, new_data}) {
	const title = `${siteTitle} - Edit Restaurant`;

	const router = useRouter();

	// Ratings method 2
	const [value, setValue] = React.useState(restaurant_data.rating);
	console.log(value);

	const [priceValue, setPriceValue] = React.useState(restaurant_data.priceValue);
	console.log(priceValue);

	// // Ratings
	// const [ratingValue, setRatingValue] = useState(-1);

  	// const handleRatingAction = (value) => {
    // 	setRatingValue(value);
  	// };

	// // price ratings
	// const [priceValue, setPriceValue] = useState(-1);
	// const [check, setCheck] = useState(false);


  	// const handlePriceAction = (value) => {
    // 	setPriceValue(value);
  	// };

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
			console.log('hello');
			await axiosInstance.post(urlCreate, body)
			.then(function (response) {
				console.log(response.data);
				router.push('/restaurant-collection/view-restaurant-collection');
			})
			.catch(function (error) {
				console.log(error);
			});
		}else{
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
								<input type='submit' value='Save' />
								<button type='button' onClick={() => discard()} >Discard</button>
								<br/>
								<label> Restaurant Name </label>
								<input type="text" placeholder="Restaurant Name" name="name" required/>
								<br/>
								<label> Type of Cuisine </label>
								<input type="text" placeholder="Type of Cuisine" name="cuisine"/>
								<br/>
								<label> Restaurant Address </label>
								<input type="text" placeholder="Restaurant Address" name="address"/>
								<br/>
								<label> Tags </label>
								<Tags restaurant_data={restaurant_data} page='edit' />
								<br/>
							
								<label> Rating (out of 5 stars) </label>
								<Rating precision={0.5} onChange={(event, newValue) => {setValue(newValue)}}/>
								<br/>

								<label> Price Range </label>
								<Rating icon={<PaidIcon/>} emptyIcon={<PaidOutlinedIcon/>} onChange={(event, newPriceValue) => {setPriceValue(newPriceValue)}}/>
								<br/>
								</form>	
								
								<label> Experiences </label>
							
						</>
					)}
					{!new_data && (
						<>
							<h1>
								Edit Restaurant Record
							</h1>
							<form onSubmit={submitEdit}>
								<input type='submit' value='Save' />
								<button type='button' onClick={() => discard()} >Discard</button>
								<br/>
								<label> Restaurant Name </label>
								<input type="text" placeholder={restaurant_data.name} defaultValue={restaurant_data.name} name="name"/>
								<br/>
								<label> Type of Cuisine </label>
								<input type="text" placeholder={restaurant_data.cuisine} defaultValue={restaurant_data.cuisine} name="cuisine"/>
								<br/>
								<label> Restaurant Address </label>
								<input type="text" placeholder={restaurant_data.address} defaultValue={restaurant_data.address} name="address"/>
								<br/>
								<label> Tags </label>
								<Tags restaurant_data={restaurant_data} page='edit' />
								<br/>
								<label> Rating (out of 5 stars) </label>
								<Rating precision={0.5} defaultValue={restaurant_data.rating} onChange={(event, newValue) => {setValue(newValue)}}/>
					
								<br/>
								<label> Price Range </label>
								<Rating icon={<PaidIcon/>} emptyIcon={<PaidOutlinedIcon/>} defaultValue={restaurant_data.priceRating} onChange={(event, newPriceValue) => {setPriceValue(newPriceValue)}}/>
								<br/>
							</form>
							
							<label> Experiences </label>
							
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