import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function Settings() {
	const title = `${siteTitle} - Settings`;
	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Settings
				</h1>

				<p>
					Setting page for users
				</p>
			</section>
		</Layout>
	);
}