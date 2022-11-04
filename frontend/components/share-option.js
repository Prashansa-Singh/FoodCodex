import styles from './css/share.module.css';
import experienceStyles from './css/experience.module.css';
import { Modal, Box, Button, Typography, Checkbox } from "@mui/material";

export default function ShareOption({userId, restaurant_data, experiences}) {
   
    
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
                <p className='white-space: normal width: 100px'>
                    Click to Share
                </p>
            </button>
        </div>

        <div className={styles.view_share_option} id={"option" + userId}>
            <div>
                In option
                {/* <Checkbox onClick={() => setPriceChecked(true)}
                    checked={checked}
                    onChange={handlesharePriceRating}
                    inputProps={{ 'aria-label': 'controlled' }} label="sharePriceName"
                /> */}
            </div>
                {/* <Button onClick={() => { openPresentShareLinkView()} }>
                        confirm
                </Button> */}
                <Button onClick={() => { closeOptionView()} }>
                    cancel
                </Button>
            </div></>
    )
}
