import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {axiosInstance} from '../api/axiosConfig';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Tags from '../../components/tags';

export async function getServerSideProps({query}) {

	const {userId, rest_id} = query;
	let restaurant_data;
	let new_data;

	if (rest_id == undefined) {
		restaurant_data = {}
		new_data = true;
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
	const tags = ["Personal", "Halal", "Vegan", "Vegetarian", "Pescatarian", "Nut Free", "Dairy Free", "Gluten Free", "Allergy Friendly", "Diabetes Friendly"]
	const [checked, setChecked] = useState([]);

	const handleCheck = (event) => {
		var updatedList = [...checked];
		if (event.target.checked) {
		  	updatedList = [...checked, event.target.value];
		} else {
		  	updatedList.splice(checked.indexOf(event.target.value), 1);
		}
		setChecked(updatedList);
	};

	const isSelected = (item) => checked.includes(item) ? "selected_tag" : "not-selected_tag";

	var selectedTags = checked.length ? checked.reduce((total, item) => {
        return total + ", " + item;
    }) : "";

	const router = useRouter();

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

		await axiosInstance.post(url, body)
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
				<>
					{new_data && (
						<>
							<h1>
								Add Restaurant Record
							</h1>
							<button>Save</button>
							<button>Discard</button>
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
							<label> Rating (out of 5 stars) </label>
							
							<br/>
							<label> Price Range </label>
							
							<br/>
							<label> Tags </label>
							{tags.map((item, index) => (
								<div key={index}>
									<input value={item} type="checkbox" onChange={handleCheck} />
									<span className={isSelected(item)}>{item}</span>
								</div>
							))}
							<div>
								{`Tags selected are: ${selectedTags}`}
							</div>
							<br/>
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
								<button>Discard</button>
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