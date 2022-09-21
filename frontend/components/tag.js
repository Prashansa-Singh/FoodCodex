import styles from './css/tag.module.css';

export default function Tag({name, colour}) {
    return (
        <div className={styles.tag} style={{'background-color': colour}} id={name}>
            <p><b>{name}</b></p>
        </div>
    );
}