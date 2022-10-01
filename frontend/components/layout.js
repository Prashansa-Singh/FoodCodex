import Head from 'next/head';
import styles from './css/layout.module.css';
import Nav from './navigation';
import Image from 'next/image';

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
                ) : (<></>)}
            </header>
            {!home && (
                <Nav className={styles.nav} />
            )}
            <main className={styles.main}>{children}</main>
            {home && (
                <div className={styles.background}>
                    <Image 
                        src="/src/home-background.svg"
                        alt="Home Background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
            )}
            {!home && (
                <div className={styles.background}>
                    <Image 
                        src="/src/logged-in-background.svg"
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
            )}
        </div>
    );
}