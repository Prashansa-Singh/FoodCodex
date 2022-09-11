import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function CustomiseTags() {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>
					Customise Tags
				</h1>

				<p>
					Page where user can customise their tags
				</p>
			</section>
		</Layout>
	);
}