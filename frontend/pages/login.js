import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { useSession, signIn, signOut } from "next-auth/react";

const LoginComponent = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<p>Logout - Signed in</p>
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		);
	} else {
		return (
			<div>
				<p>Login - Not Signed In</p>
				<button onClick={() => signIn()}>Sign in</button>
			</div>
		);
	}
};

export default function Login() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1>Login</h1>

				<p>Login page for the app</p>

				<LoginComponent />
			</section>
		</Layout>
	);
}
