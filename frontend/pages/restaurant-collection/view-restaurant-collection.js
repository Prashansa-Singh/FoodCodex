import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-collection.module.css';

import {axiosInstance} from '../api/axiosConfig';

export async function getServerSideProps() {

	const url = '/user/restaurant/6310521c744ac9f1587375fa/view-all'; // URL for the GET request to backend
	const response = await axiosInstance.get(url);
	const data = response.data;

	return {
		props: {data,},
	};
}

export default function ViewRestaurantCollection({data}) {
	const title = `${siteTitle} - Restaurant Collection`;
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
								{data.map(({ _id, name, rating, label, price }) => (
									<tr className={styles.tr} key={_id}>
										<Link href={{pathname: '/restaurant-collection/view-restaurant-record', query: {_id: _id}}}><td className={styles.td}>{name}</td></Link>
										<Link href={{pathname: '/restaurant-collection/view-restaurant-record', query: {_id: _id}}}><td className={styles.td}>{rating}</td></Link>
										<Link href={{pathname: '/restaurant-collection/view-restaurant-record', query: {_id: _id}}}><td className={styles.td}>{label}</td></Link>
										<Link href={{pathname: '/restaurant-collection/view-restaurant-record', query: {_id: _id}}}><td className={styles.td}>{price}</td></Link>
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