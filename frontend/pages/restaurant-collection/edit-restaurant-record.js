import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function EditRestaurantRecord() {
	return (
		<Layout home>
			<section className={utilStyles.headingMd}>
				<h1>
					Edit Restaurant Record
				</h1>

				<p>
					Edit a restaurant record
				</p>
			</section>
		</Layout>
	);
}