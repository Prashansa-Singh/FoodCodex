import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import LoginButton from '../components/loginbutton';
import {axiosInstance} from '../api/axiosConfig';

export default function Login() {
	
	const router = useRouter();

	const submitUser = async (event) => {
		event.preventDefault();
		const userName = event.target.userName.value;
		const password = event.target.password.value;

		const body = {
			userName: userName,
			password: password,
		};

		const url = '/login';

		axiosInstance.post(url, body)
		.then(function (response) {
			console.log(response.data);
			router.push('/restaurant-collection/view-restaurant-collection');
		})
		.catch(function (error) {
			console.log(error);
		});	
	
	}

	const title = `${siteTitle} - Login`;
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>Login</h1>

				<p>Login page for the app</p>

				<LoginButton />
			</section>
		</Layout>
	);
}
