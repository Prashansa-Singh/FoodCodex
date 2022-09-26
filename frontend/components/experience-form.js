import styles from './css/experience.module.css';
import TextField from '@mui/material/TextField';
import { axiosInstance } from '../pages/api/axiosConfig';
import { useRouter } from 'next/router';

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
    const router = useRouter();

    const submitExperience = async (event) => {
        event.preventDefault();
        const title = event.target.experiencetitle.value;
        let visitTime = event.target.experiencetime.value;
        const comment = event.target.experiencecomment.value;

        const body = {
            restaurantId: id, 
            title: title, 
            visitTime: visitTime,
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
            <button className={styles.addbutton}><img src='/src/plus-icon.svg' onClick={() => openForm()} /></button>
            <form id='experienceform' className={styles.experience_form} onSubmit={submitExperience}>
                <label><b>Title:</b></label>
                <input type='text' name='experiencetitle' placeholder='Title of the Experience' required />
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
                <label><b>Comment:</b></label>
                <textarea name='experiencecomment' placeholder='Type comment here' className={styles.textarea} required />
                <input type='submit' value='Save' />
                <button type='button' onClick={() => closeForm()} >Discard</button>
            </form> 
        </>                
    );
}

