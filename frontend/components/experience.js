import styles from './css/experience.module.css';

const data = {
    _id: '632bf3ff32c3b6e8dd4d5f0d',
    title: "First Visit",
    comment: "Simply amazeballs",
    visitTime: '2022-09-22T05:34:55.463+00:00',
}

export default function Experience({experience}) {
    return (
        <div className={styles.experience_container}>
            <p><b>{experience.title}</b></p>
            <p>{experience.visitTime}</p>
            <p>{experience.comment}</p>
        </div>
    );
}