import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function Settings() {
	return (
		<Layout home>
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