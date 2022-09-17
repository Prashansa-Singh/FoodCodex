import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function SharedWithMe() {
	const title = `${siteTitle} - Shared With Me`;
	return (
		<Layout>
			<Head>
				<title>{title}</title>
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