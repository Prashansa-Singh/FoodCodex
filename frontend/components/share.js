import utilStyles from './../styles/utils.module.css';
import styles from './../styles/view-restaurant-record.module.css';
import { axiosInstance } from './../pages/api/axiosConfig';
import { useState } from "react";
import ShareOption from './share-option';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Material Ui
import * as React from 'react';
import { Rating, Modal, Box, Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function Share({userId, restaurant_data, experiences}) {

    console.log("6 Share " + userId );
    console.log("6 Share " + restaurant_data );
    console.log("6 Share " + experiences);

    const [showOpenOptionState, setOpenOptionState] = useState(false);
    const [showPresentShareLink, setPresentShareLinkState] = useState(false);
    const [checked, setChecked] = useState(false);
    const [priceCheck, setPriceChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log("check status " + checked);
        console.log("check status " + event);
    };

    const handleshareRating = (event) => {
        setChecked(event.target.checked);
        console.log("check status " + checked);
    };

    const handlesharePriceRating = (event) => {
        setChecked(event.target.checked);
        console.log("check status " + checked);
    };

    return (
        <>
        <div>
            <ShareOption userId={userId} restaurant_data={restaurant_data} experiences={experiences}/> 
        </div>
    
                    
        {showOpenOptionState ? (
            <>
                {/* <div id={"share" + userId}>
                    I am in Share, {shareURL}
                    <Checkbox onClick={() => setPriceChecked(true)}
                        checked={checked}
                        onChange={handlesharePriceRating}
                        inputProps={{ 'aria-label': 'controlled' }} label="sharePriceName"
                    />
                </div> */}
                
             
                {/* <Button onClick={() => { openPresentShareLinkView(); setPresentShareLinkState(true); } }>
                    confirm
                </Button>
                <Button onClick={() => { closeOptionView(); setOpenOptionState(false); } }>
                    cancel
                </Button> */}

            </>

        ): null}
            
        </>
        
    )
}


// for Button template
{/* </Button><Button onClick={() => clickToShare()} title='Share Record' shareURL={shareURL}>
                <a title='Share'>
                    <div className={styles.icons}>
                        <img src='/src/nav-icons/share-icon.svg' width='40vw' alt='Share' />

                        <p className='white-space: normal width: 100px'>
                            Click to Share: {shareURL}
                        </p>
                    </div>
                </a> */}