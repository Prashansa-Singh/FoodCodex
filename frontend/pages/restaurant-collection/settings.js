import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Settings() {
	return (
		<div className={styles.container}>
			<Head>
				<title>FoodCodex</title>
				<meta name="description" content="FoodCodex App" />
				<link rel="icon" href="/foodcodex-icon.png" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Settings
				</h1>

				<p className={styles.description}>
					Settings page to users
				</p>

				<div className={styles.grid}>
				<ul>
						<li>
							<Link href="/">
								Home
							</Link>
						</li>
						<li>
							<Link href="/about">
								About
							</Link>
						</li>
						<li>
							<Link href="/login">
								Login
							</Link>
						</li>
						<li>
							<Link href="/signup">
								Sign Up
							</Link>
						</li>
						<li>
							<Link href="/restaurant-collection/view-restaurant-collection">
								View Restaurant Collection
							</Link>
						</li>
						<li>
							<Link href="/restaurant-collection/view-restaurant-record">
								View Restaurant Record
							</Link>
						</li>
						<li>
							<Link href="/restaurant-collection/edit-restaurant-record">
								Edit Restaurant Record
							</Link>
						</li>
						<li>
							<Link href="/restaurant-collection/settings">
								Settings
							</Link>
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
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}
