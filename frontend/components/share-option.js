import styles from './css/share.module.css';
import SharePresent from './share-present';
import experienceStyles from './css/experience.module.css';
import { Modal, Box, Button, Typography, Checkbox } from "@mui/material";

export default function ShareOption({userId, restaurant_data, experiences}) {
   
    // for selecting share option view 
    const openOptionView = () =>{
        const viewId = "option" + userId;
        document.getElementById(viewId).style.display="flex";
    }

    const closeOptionView = () => {
        const viewId = "option" + userId;
        document.getElementById(viewId).style.display="none";
    }

    return (
        <>
            <div className={styles.topExperienceContainer}>
                <button className={styles.icons} onClick={() => {  openOptionView(); } }>
                    <img src='/src/nav-icons/share-icon.svg' width='40vw' alt='Share' />
                    <p> Click to Share </p>
                </button>
            </div>

        <div className={styles.view_share_option} id={"option" + userId}>
            <div>
                In option
            </div>
                <SharePresent userId={userId} restaurant_data={restaurant_data} experiences={experiences}/>
                <Button variant="outlined" onClick={() => { closeOptionView()} }>
                    Cancel
                </Button>
            </div>
            
        </>
    )
}
