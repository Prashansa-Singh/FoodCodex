import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function ShareList() {
	const title = `${siteTitle} - Share`;
	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Share My List
				</h1>

				<p>
					Page where users can share records
				</p>
			</section>
		</Layout>
	);
}