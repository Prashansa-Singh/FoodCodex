import Link from 'next/link';
import styles from './css/navigation.module.css';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();

    const navItems = [
        {
            href: '/restaurant-collection/view-restaurant-collection',
            title: 'Home',
            icon: '/src/nav-icons/home-icon.svg',
        },
        {
            href: '/restaurant-collection/edit-restaurant-record',
            title: 'Add Restaurant',
            icon: '/src/nav-icons/add-edit-nav-icon.svg',
        },
        {
            href: '/',
            title: 'Customise Tags',
            icon: '/src/nav-icons/tags-icon.svg',
        },
        {
            href: '/',
            title: 'Share My List',
            icon: '/src/nav-icons/share-icon.svg',
        },
        {
            href: '/',
            title: 'Shared With Me',
            icon: '/src/nav-icons/share-with-me-icon.svg',
        },
        {
            href: '/restaurant-collection/settings',
            title: 'Settings',
            icon: '/src/nav-icons/settings-icon.svg',
        },
        {
            href: '/about',
            title: 'About Us',
            icon: '/src/nav-icons/about-us-icon.svg',
        },
        {
            href: '/',
            title: 'Logout',
            icon: '/src/nav-icons/logout-icon.svg',
        }
    ];

    return (
        <nav className={styles.nav}>
            <ul className={styles.navlist}>
                {navItems.map(({href, title, icon}) => (
                    <li className={` ${styles.unselected} ${router.asPath === href && styles.selected}`}>
                        <Link href={href}>
                            <a>
                                <div className={styles.icons}>
                                    {title}
                                    <img src={icon} />
                                </div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}