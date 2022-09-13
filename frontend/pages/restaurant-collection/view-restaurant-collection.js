import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/view-restaurant-collection.module.css'

export default function ViewRestaurantCollection() {
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
								<tr className={styles.tr}>
									<td className={styles.td}>Example</td>
									<td className={styles.td}>Example</td>
									<td className={styles.td}>Example</td>
									<td className={styles.td}>Example</td>
								</tr>
							</tbody>	
						</table>
					</div>
				</div>
			</section>
		</Layout>
	);
}