import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import LoginButton from '../components/loginbutton';
import {axiosInstance} from '../api/axiosConfig';

export default function Login() {
	
	const router = useRouter();

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
