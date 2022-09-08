import Head from 'next/head';
import Image from 'next/image';
import styles from './css/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Header from './header';
import Nav from './navigation';

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
                        <Header />
                    </>
                )}
            </header>
            <main className={styles.main}>{children}</main>
            {!home && (
                <Nav className={styles.nav} />
            )}
        </div>
    );
}