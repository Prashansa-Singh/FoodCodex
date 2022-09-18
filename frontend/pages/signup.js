import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Signup() {
	const title = `${siteTitle} - Signup`;
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Sign Up
				</h1>

				<p>
					Sign up page for users
				</p>
			</section>
		</Layout>
	);
}