import styles from './css/share.module.css';
import viewRestStyles from '../styles/view-restaurant-record.module.css';
import SharePresent from './share-present';
import { Button } from "@mui/material";

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
                <a title='Share'>
                    <div className={viewRestStyles.icons} onClick={() => { openOptionView() } }>
                        <img src='/src/nav-icons/share-icon.svg' width='40vw' alt='Share' />
                        <p> Share </p>
                    </div>
                </a>
            </div>

        <div className={styles.view_share_option} id={"option" + userId}>
                <SharePresent userId={userId} restaurant_data={restaurant_data} experiences={experiences}/>
                <Button className={styles.cancelButton} color="secondary" variant="contained" onClick={() => { closeOptionView()} }>
                    <b className={styles.textButton}>Cancel</b>
                </Button>
        </div>
            
        </>
    )
}
