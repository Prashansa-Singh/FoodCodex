import styles from './css/experience.module.css';

export default function Experience({experience}) {
    const displayTime = () => {
        console.log(experience.visitTime)

        return (
            <p>{experience.visitTime}</p>
        );
    }

    return (
        <div className={styles.experience_container}>
            <p><b>{experience.title}</b></p>
            {displayTime()}
            <p>{experience.comment}</p>
        </div>
    );
}