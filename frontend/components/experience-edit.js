import styles from './css/experience.module.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextField from '@mui/material/TextField';
import { axiosInstance } from '../pages/api/axiosConfig';

const defaultTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = String(today.getMonth() + 1);
    let day = String(today.getDate());
    if (month.length === 1) {
        month = '0' + month;
    } 
    if (day.length === 1) {
        day = '0' + day;
    } 
    const date = year + '-' + month + '-' + day;
    let hours = String(today.getHours());
    let minutes = String(today.getMinutes());
    if (hours.length === 1) {
        hours = '0' + hours;
    } 
    if (minutes.length === 1) {
        minutes = '0' + minutes;
    } 
    const time = hours + ":" + minutes;
    return date + "T" + time;
}

export default function ExperienceEdit({experience, restId}) {

    const openView = () => {
        const viewId = "experience_view" + experience._id;
        document.getElementById(viewId).style.display = "flex";
    }

    const closeEdit = () => {
        const editId = "experience_edit" + experience._id;
        document.getElementById(editId).style.display = "none";
        document.getElementById(editId).reset();
        openView();
    }

    const submitEditExperience = async (event) => {
        event.preventDefault();
        const title = event.target.experiencetitle.value;
        let visitTime = event.target.experiencetime.value;
        const comment = event.target.experiencecomment.value;

        // Update to correct timezone
        let visitDate = new Date(visitTime);
        visitDate.setTime(visitDate.getTime() + 11 * 60 * 60 * 1000)

        const body = {
            restaurantId: restId, 
            experienceId: experience._id,
            title: title, 
            visitTime: visitDate,
            comment: comment,
        };

        const url = '/user/restaurant/experience/update-one';

        await axiosInstance.post(url, body)
			.then(function (response) {
				console.log(response.data);
                window.location.reload();             
		})
			.catch(function (error) {
				console.log(error);
		});

    }

    return (
        <form className={styles.view_experience} id={"experience_edit" + experience._id} onSubmit={submitEditExperience}>
            <div className={styles.close_container}>
                <CloseRoundedIcon className={styles.viewIcon} onClick={() => closeEdit()} />
            </div>
            <h1>Edit Experience</h1>
            <div className={styles.formTop}>
                <TextField 
                    id="outlined-title" 
                    label="Title" 
                    variant="outlined" 
                    name="experiencetitle" 
                    placeholder={experience.title}
                    defaultValue={experience.title}
                    margin="dense" 
                />
                <TextField
                    id="datetime-local"
                    label="Time Visited"
                    type="datetime-local"
                    defaultValue={experience.visitTime.slice(0,19)}
                    name='experiencetime'
                    sx={{ width: 250 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <TextField  
                id="outlined-comment" 
                label="Comment" 
                variant="outlined" 
                name="experiencecomment" 
                placeholder={experience.comment}
                defaultValue={experience.comment} 
                margin="dense" 
                multiline 
                rows={8} 
                className={styles.comment}
            />
            <div className={styles.formButtonsEdit}>
                <button type='submit' className={styles.submitButton}><b>Save</b></button>
            </div>
        </form>
    );
}