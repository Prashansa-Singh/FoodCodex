import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function About() {
	const title = `${siteTitle} - About`;
	return (
		<Layout homeOther>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMdCenter}>
				<h1>
					About
				</h1>

				<p>
					About Us Page
				</p>
			</section>
		</Layout>
	);
}