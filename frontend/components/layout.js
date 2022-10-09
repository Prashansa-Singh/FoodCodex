import Head from 'next/head';
import Image from 'next/image';
import styles from './css/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Header from './header';
import Footer from './footer';
import Nav from './navigation';

export const siteTitle = 'FoodCodex';

export default function Layout({ children, home }) {
    return (
        <div className={` ${styles.container} ${home && styles.containerhome}`}>
            <Head>
                <link rel="icon" href="/src/foodcodex-icon.png" />
                <meta
                    name="description"
                    content="Document experiences at different restaurants"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img alt='FoodCodex Logo' src='/src/foodcodex-logo.png' className={styles.homelogo} />
                    </>
                ) : (
                    <>
                        <Header />
                        <Footer/>
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