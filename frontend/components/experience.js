import styles from './css/experience.module.css';

export default function Experience({experience}) {
    return (
        <div className={styles.experience_container}>
            <p><b>{experience.title}</b></p>
            <p>{experience.visitTime}</p>
            <p>{experience.comment}</p>
        </div>
    );
}