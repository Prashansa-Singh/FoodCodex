import styles from './css/experience.module.css';
import TextField from '@mui/material/TextField';

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

export default function ExperienceForm() {
    return (            
        <form className={styles.experience_form}>
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
        </form>      
    );
}


