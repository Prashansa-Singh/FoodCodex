import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {axiosInstance} from '../api/axiosConfig';
import { useRouter } from 'next/router';


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

	const submitEdit = async (event) => {
		event.preventDefault();
		const name = event.target.name.value;

		const body = {
			userId: userId,
			restaurantId: restaurant_data._id,
			name: (name != "") ? name : restaurant_data.name,
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
								<label> Experiences </label>								
							</form>	
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
								<label> Experiences </label>
								<br/>
							</form>										
						</>
					)}
				</>
			</section>
		</Layout>
	);
}