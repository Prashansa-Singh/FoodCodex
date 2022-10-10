import styles from './css/header.module.css';
import Link from "next/link";

const navLink = [
    {
        href: '/',
        title: 'Home',
        icon: '/src/nav-icons/home-icon.svg',
    }
]

export default function Header({about}) {

    return (

        <>

        <header>
            {about? (
                <>
                    {navLink.map(({ href, title, icon }) => (
                        <Link href={href}>
                            <a>
                                <div className={styles.icons}>
                                    {title}
                                    <img src={icon} />
                                  
                                </div>
                            </a>
                        </Link>
                    ))}
                </>

            ) : (
                <div className={styles.headers}>
                    <img alt='FoodCodex Logo' src='/src/foodcodex-logo.png' className={styles.logo} />
                </div>     
            )}
        </header>
        </>
        
        
    
    );
}
