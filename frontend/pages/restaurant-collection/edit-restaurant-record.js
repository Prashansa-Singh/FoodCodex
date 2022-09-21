import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function EditRestaurantRecord() {
	const title = `${siteTitle} - Edit Restaurant`;
	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Edit Restaurant Record
				</h1>

				<p>
					Edit a restaurant record
				</p>
			</section>
		</Layout>
	);
}