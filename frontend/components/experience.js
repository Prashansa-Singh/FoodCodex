import styles from './css/experience.module.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Experience({experience}) {
    const displayTime = () => {
             
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

    const openView = () => {
        const viewId = "experience_view" + experience._id;
        document.getElementById(viewId).style.display = "flex";
    }

    return (
        <div className={styles.experience_container}>
            <div className={styles.topExperienceContainer}>
                <p><b>{experience.title}</b></p>
                <MoreHorizIcon className={styles.more} onClick={() => openView()} />
            </div>
            {displayTime()}
            <div className={styles.commentContainer}>
                <p>{experience.comment}</p>
            </div>
        </div>
    );
}