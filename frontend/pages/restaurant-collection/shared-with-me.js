import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function SharedWithMe() {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Shared With Me
				</h1>

				<p>
					Displays all of the records shared with the user
				</p>
			</section>
		</Layout>
	);
}