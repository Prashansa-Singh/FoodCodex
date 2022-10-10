import styles from './css/header.module.css';


const NavLink = [
    {
        href: '/',
        title: 'Home',
        icon: '/src/nav-icons/home-icon.svg',
    }
]

export default function Header() {

    return (

        <div className={styles.headers}>
            <img alt='FoodCodex Logo' src='/src/foodcodex-logo.png' className={styles.logo} />
        </div>
    );
}
