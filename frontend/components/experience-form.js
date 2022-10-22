import styles from './css/experience.module.css';
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

export default function ExperienceForm({id}) {

    const submitExperience = async (event) => {
        event.preventDefault();
        const title = event.target.experiencetitle.value;
        let visitTime = event.target.experiencetime.value;
        const comment = event.target.experiencecomment.value;

        // Update to correct timezone
        let visitDate = new Date(visitTime);
        visitDate.setTime(visitDate.getTime() + 11 * 60 * 60 * 1000)

        const body = {
            restaurantId: id, 
            title: title, 
            visitTime: visitDate,
            comment: comment,
        };

        const url = '/user/restaurant/experience/create-one';

        await axiosInstance.post(url, body)
			.then(function (response) {
				console.log(response.data);
                window.location.reload();               
		})
			.catch(function (error) {
				console.log(error);
		});

    }

    const openForm = () => {
        document.getElementById("experienceform").style.display = "flex";
    }

    const closeForm = () => {
        document.getElementById("experienceform").style.display = "none";
        document.getElementById("experienceform").reset();
    }

    return ( 
        <>
            <button className={styles.addbutton} onClick={() => openForm()}><img src='/src/plus-icon.svg' alt='Add Experience' /></button>
            <form id='experienceform' className={styles.experience_form} onSubmit={submitExperience}>
                <div className={styles.formTop}>
                    <TextField id="outlined-title" label="Title" variant="outlined" name="experiencetitle" placeholder='Title of the Experience' required margin="dense" />
                    <TextField
                        id="datetime-local"
                        label="Time Visited"
                        type="datetime-local"
                        defaultValue={defaultTime()}
                        name='experiencetime'
                        sx={{ width: 250 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <TextField id="outlined-comment" label="Comment" variant="outlined" name="experiencecomment" placeholder='Type comment here' required margin="dense" multiline rows={4} className={styles.comment} />
                <div className={styles.formButtons}>
                    <button type='submit' className={styles.submitButton}><b>Save</b></button>
                    <button type='button' className={styles.discardButton} onClick={() => closeForm()}><b>Discard</b></button>
                </div>
            </form> 
        </>                
    );
}


