import styles from './css/header.module.css';

export default function Header() {
    return (
        <div className={styles.headers}>
            <img alt='FoodCodex Logo' src='/src/foodcodex-logo.png' />
        </div>
    );
}