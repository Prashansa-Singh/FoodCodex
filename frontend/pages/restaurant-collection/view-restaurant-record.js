import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function ViewRestaurantRecord() {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					View Restaurant Record
				</h1>

				<p>
					Page displaying single restaurant record
				</p>
			</section>
		</Layout>
	);
}