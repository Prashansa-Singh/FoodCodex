import styles from './css/experience.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';
import { axiosInstance } from '../pages/api/axiosConfig';

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

    const confirmDelete = () => {

		const body = {
			experienceId: experience._id,
		};

		const url = 'user/restaurant/experience/delete-one';

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you wish to delete this experience?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => deleteExperience(url, body),
				},
				{
					label: 'No',
				}
			]
		});
	}

    const deleteExperience = async (url, body) => {
        await axiosInstance.delete(url, {data: body})
        .then(function (response) {
            console.log(response.data);
            window.location.reload(); 
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className={styles.experience_container}>
            <div className={styles.topExperienceContainer}>
                <p><b>{experience.title}</b></p>
                <DeleteIcon className={styles.bin} onClick={() => confirmDelete()} />
            </div>
            {displayTime()}
            <p>{experience.comment}</p>
        </div>
    );
}