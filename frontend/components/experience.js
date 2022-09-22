import styles from './css/experience.module.css';

const data = {
    _id: '632bf3ff32c3b6e8dd4d5f0d',
    title: "First Visit",
    comment: "Simply amazeballs",
    visitTime: '2022-09-22T05:34:55.463+00:00',
}

const changeTimeFormat = (time) => {
    const date = time.slice(0, 10);
    const timeOfDay = time.slice(11, 19);
    const newDate = date.slice(8,10) + '/' + date.slice(5,7) + '/' + date.slice(0,4);
    const ans = newDate;
    return ans;
}

export default function Experience({experience}) {
    return (
        <div className={styles.experience_container}>
            <p><b>{experience.title}</b></p>
            <p>{changeTimeFormat(experience.visitTime)}</p>
            <p>{experience.comment}</p>
        </div>
    );
}