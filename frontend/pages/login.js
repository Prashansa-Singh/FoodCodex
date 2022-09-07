import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

const LoginComponent = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className={styles.login}>
				<h1 className={styles.title}>Logout - Signed in</h1>
				<p className={styles.description}>Login page for the app</p>
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		);
	} else {
		return (
			<div className={styles.login}>
				<h1 className={styles.title}>Login - Not Signed In</h1>
				<p className={styles.description}>Login page for the app</p>
				<button onClick={() => signIn()}>Sign in</button>
			</div>
		);
	}
};

export default function Login() {
	return (
		<div className={styles.container}>
			<Head>
				<title>FoodCodex</title>
				<meta name="description" content="FoodCodex App" />
				<link rel="icon" href="/foodcodex-icon.png" />
			</Head>

			<main className={styles.main}>
				<LoginComponent />

				<div className={styles.grid}>
					<ul>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/about">About</Link>
						</li>
						<li>
							<Link href="/login">Login</Link>
						</li>
						<li>
							<Link href="/signup">Sign Up</Link>
						</li>
						<li>
							<Link href="/view-restaurant-collection">View Restaurant Collection</Link>
						</li>
						<li>
							<Link href="/view-restaurant-record">View Restaurant Record</Link>
						</li>
						<li>
							<Link href="/edit-restaurant-record">Edit Restaurant Record</Link>
						</li>
						<li>
							<Link href="/settings">Settings</Link>
						</li>
					</ul>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
