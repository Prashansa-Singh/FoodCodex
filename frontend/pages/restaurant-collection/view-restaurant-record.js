import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function ViewRestaurantRecord() {
	return (
		<Layout home>
			<section className={utilStyles.headingMd}>
				<h1>
					View Restaurant Record
				</h1>

				<p>
					Page displaying single restaurant record
				</p>
			</section>
		</Layout>
	);
}