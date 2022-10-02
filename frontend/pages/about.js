import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function About() {
	const title = `${siteTitle} - About`;
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
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