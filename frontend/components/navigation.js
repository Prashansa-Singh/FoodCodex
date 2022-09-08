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
            href: '/restaurant-collection/customise-tags',
            title: 'Customise Tags',
            icon: '/src/nav-icons/tags-icon.svg',
        },
        {
            href: '/restaurant-collection/share-list',
            title: 'Share My List',
            icon: '/src/nav-icons/share-icon.svg',
        },
        {
            href: '/restaurant-collection/shared-with-me',
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

    const navItemsPhone = [
        {
            href: '',
            title: 'Hamburger Menu',
            icon: '/src/nav-icons/hamburger-menu-icon.svg',
        },
        {
            href: '/restaurant-collection/view-restaurant-collection',
            title: 'Home Phone',
            icon: '/src/nav-icons/home-icon.svg',
        },
        {
            href: '/restaurant-collection/edit-restaurant-record',
            title: 'Add New Restaurant',
            icon: '/src/nav-icons/add-new-icon.svg',
        }
    ];

    return (
        <nav className={styles.nav}>
            <ul className={styles.navlist}>
                {navItems.map(({href, title, icon}) => (
                    <li className={` ${styles.unselected} ${router.asPath === href && styles.selected}`} key={title}>
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
            <ul className={styles.navbar}>
                {navItemsPhone.map(({href, title, icon}) => (
                    <li className={styles.unselected} key={title}>
                        <Link href={href}>
                            <a>
                                <div className={styles.icons}>
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