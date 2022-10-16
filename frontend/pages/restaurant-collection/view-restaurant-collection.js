import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { resolve } from 'styled-jsx/css';
import Layout, { siteTitle } from '../../components/layout';
import Tags from '../../components/tags';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-collection.module.css';
import { getSession } from "next-auth/react"

import { axiosInstance } from '../api/axiosConfig';

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

	// const user = '6310521c744ac9f1587375fa';
	// console.log(session)
	const user = await session.user._id;

	const url = '/user/restaurant/view-all'; // URL for the GET request to backend
	const response = await axiosInstance.get(url, { data: { userId: user, } });
	const data = response.data;

	const displayNameUrl = '/user/view-display-name';
	const displayNameResponse = await axiosInstance.get(displayNameUrl, { data: { userId: user, } });
	const displayName = displayNameResponse.data;

	return {
		props: { data, displayName },
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


const columnSortsInitial = {
	nameSortAsc: false,
	ratingSortAsc: false,
	priceSortAsc: false,
}

const sortableColumns = {
	nameCol: 0,
	ratingCol: 1,
	priceCol: 2
}

export default function ViewRestaurantCollection({ data, displayName }) {
	const title = `${siteTitle} - Restaurant Collection`;

	const [filter, setFilter] = useState(filterTags);

	const submitFilter = (event) => {
		event.preventDefault();
		let updatePersonal = { personalOption: event.target.personalOption.value === 'true' };
		let updateHalal = { halalOption: event.target.halalOption.value === 'true' };
		let updateVegan = { veganOption: event.target.veganOption.value === 'true' };
		let updateVegetarian = { vegetarianOption: event.target.vegetarianOption.value === 'true' };
		let updatePescatarian = { pescatarianOption: event.target.pescatarianOption.value === 'true' };
		let updateNutsFree = { nutsFreeOption: event.target.nutsFreeOption.value === 'true' };
		let updateDairyFree = { dairyFreeOption: event.target.dairyFreeOption.value === 'true' };
		let updateGlutenFree = { glutenFreeOption: event.target.glutenFreeOption.value === 'true' };
		let updateAllergyFriendly = { allergyFriendlyOption: event.target.allergyFriendlyOption.value === 'true' };
		let updateDiabetesFriendly = { diabetesFriendlyOption: event.target.diabetesFriendlyOption.value === 'true' };
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
		filterIconChange();
	}

	const filterIconChange = () => {
		const icon = document.getElementById('filterIcon');
		if (Object.values(filter).includes(true)) {
			icon.src = '/src/nav-icons/filter-icon.svg';
		} else {
			icon.src = '/src/nav-icons/filter-applied-icon.svg';
		}
	}

	const clearFilter = () => {
		setFilter({ ...filterTags });
		console.log(filterTags);
		window.location.reload();
	}

	const openPopUp = () => {
		const elem = document.getElementById('filter');
		elem.style.display = 'flex';
	}

	const closePopUp = () => {
		const elem = document.getElementById('filter');
		elem.style.display = 'none';
	}

	const updateTable = (_id) => {
		let dataRow;
		for (let i = 0; i < data.length; i++) {
			if (data[i]._id === _id) {
				dataRow = data[i];
			}
		}
		let show = true;
		Object.keys(filter).forEach(function (option) {
			if (filter[option]) {
				show = show && dataRow[option];
			}
		});

		if (searchName !== null) {
			if (!dataRow["name"].includes(searchName)) {
				show = false
			}
		}

		return show;
	}


	const [colSorts, setColSorts] = useState(columnSortsInitial);


	const handleSortClick = (colNum) => {
		if (typeof window !== 'undefined') {

			// change sort order for this column
			let sortKey = Object.keys(colSorts)[colNum]
			colSorts[sortKey] = !colSorts[sortKey]
			setColSorts(colSorts)

			sortTable(colNum, colSorts[sortKey]);
		}

	}

	const sortName = () => {
		handleSortClick(sortableColumns.nameCol);
	}


	const sortRating = () => {
		handleSortClick(sortableColumns.ratingCol);
	}


	const sortPrice = () => {
		handleSortClick(sortableColumns.priceCol);
	}


	const sortTable = (colNum, ascendingOrder) => {
		if (typeof window !== 'undefined') {
			let table, rows, switching, i, x, y, shouldSwitch;
			table = document.getElementById("restaurantTable");
			switching = true;

			while (switching) {
				switching = false;
				rows = table.rows;

				// Loop over all table rows except header row
				for (i = 1; i < (rows.length - 1); i++) {
					shouldSwitch = false;
					x = rows[i].getElementsByTagName("td")[colNum];
					y = rows[i + 1].getElementsByTagName("td")[colNum];

					// compare current and next row to determine if they should be switched
					if (ascendingOrder) {
						if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
							shouldSwitch = true;
							break;
						}
					} else {
						// descending order comparison
						if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
							shouldSwitch = true;
							break;
						}
					}
				}
				if (shouldSwitch) {
					rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					switching = true;
				}
			}
		}
	}

	const [searchName, setSearchName] = useState('');

	const changeSearchName = (event) => {
		event.preventDefault();

		if (event.target.value === '') {
			setSearchName(null);
		}
		else {
			setSearchName(event.target.value);
		}
	}

	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Welcome Back {displayName.displayName}
				</h1>

				<div className={styles.collection_container}>
					<input
						className={styles.searchbar}
						id='searchbar'
						type="search"
						name="search"
						placeholder="Search..."
						onChange={changeSearchName}
					/>
					<div className={styles.filter}>
						<img className={styles.icon} src='/src/nav-icons/filter-icon.svg' alt='Filter Icon' onClick={openPopUp} id='filterIcon' />
						<div className={styles.filter_options} id='filter'>
							<p className={styles.close} onClick={closePopUp}>&#10006;</p>
							<form onSubmit={submitFilter}>
								<Tags restaurant_data={filterTags} page='edit' />
								<div className={styles.button_container}>
									<input type='submit' value='Apply' />
									<button type='button' onClick={() => clearFilter()}>Discard</button>
								</div>
							</form>
						</div>
					</div>
					<div className={styles.table_container}>
						<table id="restaurantTable" className={styles.table}>
							<thead className={styles.thead}>
								<tr className={styles.tr}>
									<th className={styles.th}>Name
										<img className={styles.icon} src='/src/nav-icons/sort-icon.svg' alt='Sort Name Icon' onClick={sortName} id='sortIcon'></img>
									</th>
									<th className={styles.th}>Rating
										<img className={styles.icon} src='/src/nav-icons/sort-icon.svg' alt='Sort Rating Icon' onClick={sortRating} id='sortIcon'></img>
									</th>
									<th className={styles.th}>Price
										<img className={styles.icon} src='/src/nav-icons/sort-icon.svg' alt='Sort Price Icon' onClick={sortPrice} id='sortIcon'></img>
									</th>
									<th className={styles.th}>Label</th>
								</tr>
							</thead>
							<tbody>
								{data.map(({ _id, name, rating, priceRating, personalOption, halalOption, veganOption, vegetarianOption, pescatarianOption, nutsFreeOption, dairyFreeOption, glutenFreeOption, allergyFriendlyOption, diabetesFriendlyOption }) => (
									<tr className={styles.tr} key={_id} style={{ 'display': updateTable(_id) ? '' : 'none' }}>
										<Link href={{ pathname: '/restaurant-collection/view-restaurant-record', query: { _id: _id } }}><td className={styles.td}>{name}</td></Link>
										<Link href={{ pathname: '/restaurant-collection/view-restaurant-record', query: { _id: _id } }}><td className={styles.td}>{rating}</td></Link>
										<Link href={{ pathname: '/restaurant-collection/view-restaurant-record', query: { _id: _id } }}><td className={styles.td}>{priceRating}</td></Link>
										<Link href={{ pathname: '/restaurant-collection/view-restaurant-record', query: { _id: _id } }}>
											<td className={styles.td}><Tags restaurant_data={{
												personalOption: personalOption,
												halalOption: halalOption,
												veganOption: veganOption,
												vegetarianOption: vegetarianOption,
												pescatarianOption: pescatarianOption,
												nutsFreeOption: nutsFreeOption,
												dairyFreeOption: dairyFreeOption,
												glutenFreeOption: glutenFreeOption,
												allergyFriendlyOption: allergyFriendlyOption,
												diabetesFriendlyOption: diabetesFriendlyOption
											}} page='viewAll' /></td>
										</Link>
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