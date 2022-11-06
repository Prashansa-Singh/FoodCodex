import styles from './css/experience.module.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { confirmAlert } from 'react-confirm-alert';
import { axiosInstance } from '../pages/api/axiosConfig';

export default function ExperienceView({experience}) {
    
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
            <div>{visitDate.toDateString()} {finalTime}</div>
        );
    }

    const closeView = () => {
        const viewId = "experience_view" + experience._id;
        document.getElementById(viewId).style.display = "none";
    }

    const openEdit = () => {
        const editId = "experience_edit" + experience._id;
        document.getElementById(editId).style.display = "flex";
        closeView();
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
        <div className={styles.view_experience} id={"experience_view" + experience._id}>
            <div className={styles.close_container}>
                <CloseRoundedIcon className={styles.viewIcon} onClick={() => closeView()} />
            </div>
            <div className={styles.viewInformation}>
                <div className={styles.topExperienceContainer}>
                    <div className={styles.viewTitle}><b>{experience.title}</b></div>
                    <div>
                        <EditIcon className={styles.viewIcon} onClick={() => openEdit()} />
                        <DeleteIcon className={styles.viewIcon} onClick={() => confirmDelete()} />
                    </div>
                </div>
                <div>{displayTime()}</div>
                <div className={styles.viewComment}>{experience.comment}</div>
            </div>
        </div>
    );
}