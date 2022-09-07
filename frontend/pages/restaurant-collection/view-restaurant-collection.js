import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function ViewRestaurantCollection() {
	return (
		<Layout home>
			<section className={utilStyles.headingMd}>
				<h1>
					View Restaurant Collection
				</h1>

				<p>
					Display all the restaurants of the user
				</p>
			</section>
		</Layout>
	);
}