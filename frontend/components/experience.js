import styles from './css/experience.module.css';

export default function Experience({experience}) {
    const displayTime = () => {
        console.log(experience.visitTime)
             
        let visitTime  = experience.visitTime
        visitTime = visitTime.substring(0, visitTime.length - 1);

        let visitDate = new Date(visitTime)
        let hours = visitDate.getHours()
        let mins = visitTime.substring(visitTime.length - 9, visitTime.length - 7)

        // Convert from 24 hour to 12 hour time
        let AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        let finalTime = hours + ":" + mins + " " + AmOrPm; 

        return (
            <p>{visitDate.toDateString()} {finalTime}</p>
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