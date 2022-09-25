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
	const [value, setValue] = React.useState(2);

	const ColoredPrice = (props) => {
		return (
			<svg
        width={307}
        height={315}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M153.693 294.811c-73.463 0-152.72-46.079-152.72-147.19C.973 46.509 80.23.431 153.693.431c40.813 0 78.467 13.428 106.378 37.916 30.28 26.858 46.342 64.774 46.342 109.274 0 44.499-16.062 82.153-46.342 109.01-27.911 24.488-65.828 38.18-106.378 38.18Z"
          fill="url(#a)"
        />
        <path
          d="M279.792 60.123c14.035 22.644 21.355 49.607 21.355 79.598 0 44.5-16.062 82.153-46.343 109.011-27.911 24.488-65.828 38.18-106.377 38.18-47.554 0-97.53-19.353-126.863-60.403 28.332 46.5 81.599 68.302 132.129 68.302 40.55 0 78.466-13.692 106.377-38.18 30.281-26.857 46.343-64.511 46.343-109.01 0-33.546-9.137-63.353-26.621-87.498Z"
          fill="#EB8F00"
        />
        <path
          d="M151.245 193.753c-33.493 0-64.617-2.818-90.605-7.61-6.451-1.185-12.139 4.476-10.822 10.901 8.636 42.235 50.213 76.913 101.401 76.913 56.006 0 93.712-35.81 101.532-77.071 1.211-6.372-4.476-11.928-10.848-10.743-26.015 4.792-57.165 7.61-90.658 7.61Z"
          fill="#422B0D"
        />
        <path
          d="M222.102 132.902a15.254 15.254 0 0 0-3.476-5.161c-1.527-1.501-3.37-2.791-5.556-3.897-1.737-.869-3.686-1.685-5.792-2.423V99.277c.395.132.816.237 1.184.421a9.677 9.677 0 0 1 3.397 2.791c.922 1.185 1.633 2.607 2.107 4.24.184.658.342 1.316.447 2.001.316 1.922 1.896 3.397 3.845 3.397h.105c2.528 0 4.397-2.239 4.029-4.714-.553-3.791-1.817-6.925-3.766-9.4-2.686-3.423-6.477-5.477-11.348-6.161v-5.82a3.821 3.821 0 0 0-3.818-3.817 3.82 3.82 0 0 0-3.818 3.817v6.004c-1.949.316-3.766.816-5.398 1.58-1.949.895-3.581 2.08-4.951 3.555-1.342 1.474-2.396 3.212-3.159 5.187-.738 1.975-1.106 4.186-1.106 6.661 0 2.607.421 4.898 1.264 6.873a16.33 16.33 0 0 0 3.607 5.266c1.554 1.527 3.423 2.844 5.635 3.95a45.746 45.746 0 0 0 4.108 1.79v22.829l-.027.027c-1.922-.343-3.581-1.106-5.029-2.317-1.159-.975-2.08-2.265-2.817-3.871-.369-.816-.632-1.712-.817-2.739-.342-1.895-1.869-3.37-3.818-3.37h-.395c-2.396 0-4.213 2.159-3.818 4.503a17.975 17.975 0 0 0 1.106 3.976c.974 2.369 2.238 4.318 3.845 5.871a16.585 16.585 0 0 0 5.529 3.555c1.975.79 4.055 1.264 6.214 1.527v4.582a3.821 3.821 0 0 0 3.818 3.818 3.82 3.82 0 0 0 3.818-3.818v-4.713c2.212-.29 4.266-.79 6.109-1.554 2.08-.869 3.844-2.027 5.319-3.476 1.448-1.448 2.58-3.159 3.397-5.187.79-2.001 1.211-4.292 1.211-6.819.026-2.581-.369-4.872-1.185-6.82Zm-26.068-17.01c-1-.922-1.738-1.975-2.212-3.107-.474-1.132-.711-2.423-.711-3.897.027-3.134.948-5.609 2.765-7.452.974-1 2.265-1.711 3.766-2.159v19.037c-1.449-.737-2.66-1.553-3.608-2.422Zm18.3 28.227c-.579 1.264-1.369 2.343-2.422 3.239-1.053.895-2.344 1.579-3.845 2.027-.237.079-.5.105-.763.158v-19.775c2.08.975 3.765 2.028 4.976 3.186 1.975 1.896 2.95 4.161 2.897 6.82 0 1.659-.29 3.081-.843 4.345Z"
          fill="#422B0D"
          stroke="#422B0D"
          strokeWidth={1.317}
          strokeMiterlimit={10}
        />
        <path
          d="M103.506 213.133v55.69c0 25.041 20.302 45.315 45.316 45.315h8.637c25.041 0 45.315-20.301 45.315-45.315v-56.085c-50.055 9.795-87.34 3.159-99.268.395Z"
          fill="#05E005"
        />
        <path
          d="M151.218 205.891c-16.299 0-32.334-.658-47.712-1.948v9.19c11.955 2.764 49.213 9.4 99.295-.395v-9.164a573.858 573.858 0 0 1-51.583 2.317Z"
          fill="#05E005"
        />
        <path
          opacity={0.3}
          d="M151.218 205.891c-16.299 0-32.334-.658-47.712-1.948v9.19c11.955 2.764 49.213 9.4 99.295-.395v-9.164a573.858 573.858 0 0 1-51.583 2.317Z"
          fill="#AB3F2E"
        />
        <path
          d="M173.099 267.085a15.247 15.247 0 0 0-3.475-5.161c-1.527-1.501-3.371-2.791-5.556-3.897a49.746 49.746 0 0 0-5.793-2.422V233.46c.395.132.816.237 1.185.421 1.343.659 2.475 1.607 3.397 2.792.921 1.184 1.632 2.606 2.106 4.239.184.658.342 1.316.448 2.001.316 1.922 1.896 3.397 3.844 3.397h.105c2.528 0 4.398-2.238 4.029-4.714-.553-3.765-1.817-6.898-3.765-9.4-2.686-3.423-6.478-5.477-11.349-6.161v-5.819a3.82 3.82 0 0 0-3.818-3.818 3.82 3.82 0 0 0-3.818 3.818v6.003c-1.948.316-3.765.816-5.398 1.58-1.948.895-3.581 2.08-4.95 3.555-1.343 1.474-2.396 3.212-3.16 5.187-.737 1.975-1.106 4.186-1.106 6.662 0 2.606.422 4.897 1.264 6.872a16.332 16.332 0 0 0 3.608 5.266c1.553 1.527 3.423 2.844 5.634 3.95a45.871 45.871 0 0 0 4.108 1.79v22.829l-.026.027c-1.922-.343-3.581-1.106-5.03-2.317-1.158-.975-2.08-2.265-2.817-3.871-.369-.816-.632-1.712-.816-2.738-.369-1.896-1.896-3.371-3.845-3.371h-.395c-2.396 0-4.212 2.159-3.818 4.503a17.96 17.96 0 0 0 1.106 3.976c.975 2.37 2.239 4.318 3.845 5.872a16.598 16.598 0 0 0 5.529 3.554c1.975.79 4.055 1.264 6.214 1.527v4.582a3.82 3.82 0 0 0 3.818 3.818 3.82 3.82 0 0 0 3.818-3.818v-4.713c2.212-.29 4.266-.79 6.109-1.554 2.08-.869 3.845-2.027 5.319-3.475 1.448-1.449 2.581-3.16 3.397-5.188.79-2.001 1.211-4.292 1.211-6.819.026-2.581-.369-4.845-1.159-6.82Zm-26.094-17.01c-1-.922-1.737-1.975-2.211-3.107-.474-1.132-.711-2.422-.711-3.897.026-3.133.948-5.609 2.764-7.452.975-1 2.265-1.711 3.766-2.159v19.037c-1.448-.737-2.66-1.553-3.608-2.422Zm18.3 28.253c-.579 1.264-1.369 2.344-2.422 3.239-1.053.895-2.343 1.58-3.844 2.027-.237.079-.501.106-.764.158v-19.774c2.08.974 3.765 2.027 4.977 3.186 1.974 1.896 2.949 4.16 2.896 6.82 0 1.632-.29 3.054-.843 4.344Z"
          fill="#404040"
        />
        <path
          d="M64.563 68.338c-4.398 3.765-10.928-1.659-6.82-6.82 3.054-3.739 7.162-7.294 11.638-9.98 12.06-7.767 26.91-10.268 39.576-7.767 6.451 1.396 4.476 9.61-1.422 9.637-14.93-.21-30.491 4.819-42.972 14.93ZM243.008 68.338c4.398 3.765 10.928-1.659 6.82-6.82-3.054-3.739-7.162-7.294-11.638-9.98-12.06-7.767-26.911-10.268-39.576-7.767-6.451 1.396-4.476 9.61 1.422 9.637 14.93-.21 30.518 4.819 42.972 14.93Z"
          fill="#422B0D"
        />
        <path
          d="M119.7 132.902a15.254 15.254 0 0 0-3.476-5.161c-1.527-1.501-3.37-2.791-5.555-3.897a49.992 49.992 0 0 0-5.793-2.423V99.277c.395.132.816.237 1.185.421a9.684 9.684 0 0 1 3.396 2.791c.922 1.185 1.633 2.607 2.107 4.24.184.658.342 1.316.447 2.001.316 1.922 1.896 3.396 3.845 3.396h.105c2.528 0 4.397-2.238 4.029-4.713-.553-3.765-1.817-6.898-3.766-9.4-2.685-3.423-6.477-5.477-11.348-6.161v-5.82a3.821 3.821 0 0 0-3.818-3.818 3.82 3.82 0 0 0-3.818 3.818v6.004c-1.949.316-3.766.816-5.398 1.58-1.949.895-3.581 2.08-4.95 3.555-1.343 1.474-2.397 3.212-3.16 5.187-.737 1.975-1.106 4.186-1.106 6.661 0 2.607.421 4.898 1.264 6.873a16.33 16.33 0 0 0 3.607 5.266c1.554 1.527 3.423 2.844 5.635 3.95a45.827 45.827 0 0 0 4.108 1.79v22.829l-.027.027c-1.922-.343-3.58-1.106-5.029-2.318-1.159-.974-2.08-2.264-2.817-3.87-.369-.816-.632-1.712-.817-2.739-.342-1.895-1.87-3.37-3.818-3.37h-.395c-2.396 0-4.213 2.159-3.818 4.503a17.954 17.954 0 0 0 1.106 3.976c.975 2.369 2.239 4.318 3.845 5.871a16.588 16.588 0 0 0 5.53 3.555c1.974.79 4.054 1.264 6.213 1.527v4.582a3.821 3.821 0 0 0 3.818 3.818 3.82 3.82 0 0 0 3.818-3.818v-4.713c2.212-.29 4.266-.79 6.109-1.554 2.08-.869 3.844-2.027 5.319-3.476 1.448-1.448 2.58-3.159 3.397-5.187.79-2.001 1.211-4.292 1.211-6.82.026-2.58-.369-4.871-1.185-6.819Zm-26.068-17.01c-1-.922-1.738-1.975-2.212-3.107-.473-1.132-.71-2.423-.71-3.897.026-3.134.948-5.609 2.764-7.452.975-1 2.265-1.711 3.766-2.16v19.038c-1.448-.737-2.66-1.553-3.608-2.422Zm18.3 28.227c-.579 1.264-1.369 2.343-2.422 3.238-1.053.896-2.344 1.58-3.844 2.028-.237.079-.501.105-.764.158v-19.775c2.08.975 3.765 2.028 4.977 3.186 1.974 1.896 2.949 4.161 2.896 6.82 0 1.659-.29 3.081-.843 4.345Z"
          fill="#422B0D"
          stroke="#422B0D"
          strokeWidth={1.317}
          strokeMiterlimit={10}
        />
        <defs>
          <radialGradient
            id="a"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(153.693 147.621) scale(149.981)"
          >
            <stop offset={0.5} stopColor="#FDE030" />
            <stop offset={0.919} stopColor="#F7C02B" />
            <stop offset={1} stopColor="#F4A223" />
          </radialGradient>
        </defs>
      </svg>
		)
	}


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
			priceRating: undefined,
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
								<Rating name="half-rating" precision={0.5} defaultValue={0} max={5}/>
								<br/>

								<label> Price Range </label>
								<Rating icon={<PaidIcon/>} emptyIcon={<PaidOutlinedIcon/>} defaultValue={0} max ={5}/>

								{/* <div className={utilStyles.emptyCircle`${check? 'checkedCircle': 'emptyCircle'}` } /> */}
								{/* <Price iconSize="l" showOutOf={true} enableUserInteraction={true} onClick={handlePriceAction}/> */}
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
							</form>
							<label> Rating (out of 5 stars) </label>
							{restaurant_data.rating}							
							<br/>
							<label> Price Range </label>
							{restaurant_data.priceRating}
							<br/>
							
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