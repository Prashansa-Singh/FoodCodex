import styles from './header.module.css';
import Image from 'next/image';

export default function Header() {
    return (
        <div className={styles.headers}>
            <img alt='FoodCodex Logo' src='/foodcodex-logo.png' />
        </div>
    );
}