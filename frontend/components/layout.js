import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'FoodCodex';
export const siteTitle = 'FoodCodex';

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/foodcodex-icon.png" />
                <meta
                    name="description"
                    content="Document experiences at different restaurants"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/foodcodex-logo.png"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={600}
                            alt="FoodCodex Logo"
                        />
                    </>
                ) : (
                    <>
                        <Image
                            priority
                            src="/foodcodex-logo.png"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={600}
                            alt="FoodCodex Logo"
                        />
                    </>
                )}
            </header>
            <main>{children}</main>
            <nav>
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
            </nav>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    );
}