import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Signup() {
	return (
		<Layout home>
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