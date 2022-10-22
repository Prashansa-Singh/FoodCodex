import Link from 'next/link';
import styles from './css/navigation.module.css';
import { useRouter } from 'next/router';
import Hamburger from './hamburger';
import { useState } from 'react';
import { signOut } from 'next-auth/react'; 

export default function Nav() {
    const router = useRouter();

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
        openHamburger();
    }

    const openHamburger = () => {
        const elem = document.getElementsByClassName(styles.navlist)[0];
        const logo = document.getElementById("logo");
        if (hamburgerOpen) {
            elem.style.display = "none";
            logo.style.display = "none";
        } else {
            elem.style.display = "flex";
            logo.style.display = "flex";
        }
    }

    const navItems = [
        {
            href: '/restaurant-collection/view-restaurant-collection',
            title: 'Home',
            icon: '/src/nav-icons/home-icon.svg',
            alt: 'Home',
        },
        {
            href: '/restaurant-collection/edit-restaurant-record',
            title: 'Add Restaurant',
            icon: '/src/nav-icons/add-edit-nav-icon.svg',
            alt: 'Add Restaurant',
        },
        {
            href: '/restaurant-collection/share-list',
            title: 'Share My List',
            icon: '/src/nav-icons/share-icon.svg',
            alt: 'Share My List',
        },
        {
            href: '/restaurant-collection/shared-with-me',
            title: 'Shared With Me',
            icon: '/src/nav-icons/share-with-me-icon.svg',
            alt: 'Shared With Me',
        },
        {
            href: '/restaurant-collection/settings',
            title: 'Settings',
            icon: '/src/nav-icons/settings-icon.svg',
            alt: 'Settings',
        },
        {
            href: '/about',
            title: 'About Us',
            icon: '/src/nav-icons/about-us-icon.svg',
            alt: 'About Us',
        },
        {
            href: '/logout',
            title: <div onClick={(e) => {
                e.preventDefault()
                router.push('/logout')
            }}>Logout</div>,
            icon: '/src/nav-icons/logout-icon.svg',
            alt: 'Logout',
        }
    ];

    const navItemsPhone = [
        {
            href: '',
            title: 'Hamburger Menu',
            icon: <div onClick={toggleHamburger}><Hamburger isOpen={hamburgerOpen} /></div>,
        },
        {
            href: '/restaurant-collection/view-restaurant-collection',
            title: 'Home Phone',
            icon: <img src='/src/nav-icons/home-icon.svg' alt='Home' />,
        },
        {
            href: '/restaurant-collection/edit-restaurant-record',
            title: 'Add New Restaurant',
            icon: <img src='/src/nav-icons/add-new-icon.svg' alt='Add New Restaurant' />,
        }
    ];

    return (
        <nav className={styles.nav}>
            <div>
                <img alt='FoodCodex Logo' src='/src/foodcodex-logo.png' className={styles.logo} id='logo' />
                <ul className={styles.navlist}>
                    {navItems.map(({ href, title, icon, alt }) => (
                        <li className={` ${styles.unselected} ${router.asPath === href && styles.selected}`} key={title}>
                            <Link href={href} title={alt}>
                                <a title={alt}>
                                    <div className={styles.icons}>
                                        {title}
                                        <img src={icon} alt={alt} />
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul className={styles.navbar}>
                    {navItemsPhone.map(({ href, title, icon }) => (
                        <li className={styles.unselected} key={title}>
                            <Link href={href} title={title}>
                                <a title={title}>
                                    <div className={styles.icons}>
                                        {icon}
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}