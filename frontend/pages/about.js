import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function About() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle} - About</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					About
				</h1>

				<p>
					About page
				</p>
			</section>
		</Layout>
	);
}