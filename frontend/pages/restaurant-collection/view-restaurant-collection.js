import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import Tags from '../../components/tags';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-collection.module.css';

import {axiosInstance} from '../api/axiosConfig';

export async function getServerSideProps() {

	const user = '6310521c744ac9f1587375fa';
	const url = '/user/restaurant/view-all'; // URL for the GET request to backend
	const response = await axiosInstance.get(url, {data: {userId: user,}});
	const data = response.data;

	return {
		props: {data,},
	};
}

const filterTags = {
	personalOption: false,
    halalOption: false,
    veganOption: false,
    vegetarianOption: false,
    pescatarianOption: false,
    nutsFreeOption: false,
    dairyFreeOption: false,
    glutenFreeOption: false,
    allergyFriendlyOption: false,
    diabetesFriendlyOption: false
}

export default function ViewRestaurantCollection({data}) {
	const title = `${siteTitle} - Restaurant Collection`;

	const [filter, setFilter] = useState(filterTags);
	console.log(filter);

	const submitFilter = (event) => {
		event.preventDefault();
		let updatePersonal = {personalOption:event.target.personalOption.value === 'true'}; 
		let updateHalal = {halalOption:event.target.halalOption.value === 'true'}; 
		let updateVegan = {veganOption:event.target.veganOption.value === 'true'}; 
		let updateVegetarian = {vegetarianOption:event.target.vegetarianOption.value === 'true'}; 
		let updatePescatarian = {pescatarianOption:event.target.pescatarianOption.value === 'true'}; 
		let updateNutsFree = {nutsFreeOption:event.target.nutsFreeOption.value === 'true'}; 
		let updateDairyFree = {dairyFreeOption:event.target.dairyFreeOption.value === 'true'}; 
		let updateGlutenFree = {glutenFreeOption:event.target.glutenFreeOption.value === 'true'}; 
		let updateAllergyFriendly = {allergyFriendlyOption:event.target.allergyFriendlyOption.value === 'true'}; 
		let updateDiabetesFriendly = {diabetesFriendlyOption:event.target.diabetesFriendlyOption.value === 'true'}; 
		setFilter(filter => ({
			...filter,
			...updatePersonal,
			...updateHalal,
			...updateVegan,
			...updateVegetarian,
			...updatePescatarian,
			...updateNutsFree,
			...updateDairyFree,
			...updateGlutenFree,
			...updateAllergyFriendly,
			...updateDiabetesFriendly,
		}));
	}

	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Restaurant Collection
				</h1>

				<div className={styles.collection_container}>
					<input 
						className={styles.searchbar}
						id='searchbar'
						type="search" 
						name="search"
						placeholder="Search..." 
					/>
					<div className={styles.filter}>
						<div className={styles.filter_icon_heading}>
							<img className={styles.icon} src='/src/nav-icons/filter-icon.svg' alt='Filter Icon' />
							<h4>Filter</h4>
						</div>
						<div className={styles.filter_options}>
							<form onSubmit={submitFilter}>
								<Tags restaurant_data={filterTags} page='edit' />
								<div className={styles.button_container}>
									<input type='submit' value='Apply' />
								</div>
							</form>
						</div>
					</div>
					<div className={styles.table_container}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th className={styles.th}>Name</th>
									<th className={styles.th}>Rating</th>
									<th className={styles.th}>Price</th>
								</tr>
							</thead>
							<tbody>
								{data.map(({ _id, name, rating, priceRating }) => (
									<tr className={styles.tr} key={_id}>
										<Link href={{pathname: '/restaurant-collection/view-restaurant-record', query: {_id: _id}}}><td className={styles.td}>{name}</td></Link>
										<Link href={{pathname: '/restaurant-collection/view-restaurant-record', query: {_id: _id}}}><td className={styles.td}>{rating}</td></Link>
										<Link href={{pathname: '/restaurant-collection/view-restaurant-record', query: {_id: _id}}}><td className={styles.td}>{priceRating}</td></Link>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</Layout>
	);
}