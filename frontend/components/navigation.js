import Link from 'next/link';
import styles from './css/navigation.module.css';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();

    const navItems = [
        {
            href: '/',
            title: 'Home',
        },
        {
            href: '/about',
            title: 'About',
        },
        {
            href: '/login',
            title: 'Login',
        },
        {
            href: '/signup',
            title: 'Sign Up',
        },
        {
            href: '/restaurant-collection/view-restaurant-collection',
            title: 'View Restaurant Collection',
        },
        {
            href: '/restaurant-collection/view-restaurant-record',
            title: 'View Restaurant Record',
        },
        {
            href: '/restaurant-collection/edit-restaurant-record',
            title: 'Edit Restaurant Record',
        },
        {
            href: '/restaurant-collection/settings',
            title: 'Settings',
        }
    ];

    return (
        <nav className={styles.nav}>
            <ul className={styles.navlist}>
                {navItems.map(({href, title}) => (
                    <li className={` ${styles.unselected} ${router.asPath === href && styles.selected}`}>
                        <Link href={href}>
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}