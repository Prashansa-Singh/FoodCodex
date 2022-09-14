import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-collection.module.css'

import axios from 'axios';


const test_data = {
    "posts": [
        {
            "name": "Hochi Mama",
            "rating": "5",
            "label": "",
			"price": ""
        },
        {
            "name": "Restaurant 2",
            "rating": "4",
            "label": "",
			"price": ""
        },
        {
            "name": "Restaurant 3",
            "rating": "3",
            "label": "",
			"price": ""
        },
        {
            "name": "Restaurant 4",
            "rating": "1",
            "label": "",
			"price": ""
        }
    ]
}

export async function getServerSideProps() {

	const url = 'http://localhost:8000/retrieve/6310521c744ac9f1587375fa'; // URL for the GET request to backend
	const response = await axios.get(url);
	const data = response.data;

	return {
		props: {data,},
	};
}

export default function ViewRestaurantCollection({data}) {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
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
							<p>Filter will go here</p>
						</div>
					</div>
					<div className={styles.table_container}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th className={styles.th}>Name</th>
									<th className={styles.th}>Rating</th>
									<th className={styles.th}>Label</th>
									<th className={styles.th}>Price</th>
								</tr>
							</thead>
							<tbody>
								{data.map(({ name, rating, label, price }) => (
									<tr className={styles.tr}>
										<td className={styles.td}>{name}</td>
										<td className={styles.td}>{rating}</td>
										<td className={styles.td}>{label}</td>
										<td className={styles.td}>{price}</td>
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