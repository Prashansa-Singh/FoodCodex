import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
	return (
		<Layout home>
			<section className={utilStyles.headingMd}>
				<h1>
					Home
				</h1>

				<p>
					Home page for unauthorised users
				</p>
			</section>
		</Layout>
	);
}

