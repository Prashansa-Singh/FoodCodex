import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Login() {
	return (
		<Layout home>
			<section className={utilStyles.headingMd}>
				<h1>
					Login
				</h1>

				<p>
					Login page for the app
				</p>
			</section>
		</Layout>
	);
}