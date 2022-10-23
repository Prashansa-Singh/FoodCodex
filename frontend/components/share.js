import utilStyles from './../styles/utils.module.css';
import styles from './../styles/view-restaurant-record.module.css';
import { axiosInstance } from './../pages/api/axiosConfig';
import { confirmAlert } from 'react-confirm-alert';
import { useState } from "react";

import 'react-confirm-alert/src/react-confirm-alert.css';

// Material Ui
import * as React from 'react';
import { Rating, Modal, Box, Button, Typography } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// for checkboxes 
// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Share({userId, restaurant_data, experiences}) {
    

    console.log("6 Share " + userId );
    console.log("6 Share " + restaurant_data );
    console.log("6 Share " + experiences);

    const [showModal, setShowModal] = useState(false);
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


    const closeView = () => {

        const viewId = "share" + userId;
        document.getElementById(viewId).style.display="none";
    }

    const openView = () =>{
        const viewId = "share" + userId;
        document.getElementById(viewId).style.display="flex";
    }

    // -------------------------- sharing --------------------------
	const [shareId, setShareId] = useState(null);
	const [shareURL, setShareURL] = useState(null);
	let shareLink;

	const clickToShare = async() => {
		
		const body = {
			senderId: userId,
			restaurantId: restaurant_data._id,
			shareName: true,
			shareRating: true,
			sharePriceRating: priceCheck,
			shareCuisine: true,
			shareAddress: true,
			shareOptionTags: true
		};
		
		console.log("2");
		// has share id 
		const URL = '/user/restaurant/share/generate-link';
		await generateRestaurantShareLink(URL, body);
	
		// present full share link
		const baseURL = (process.env.NODE_ENV == "production") ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND : process.env.NEXT_PUBLIC_DEVELOPMENT_FRONTEND; //backend to frontend 
		const midURL = "restaurant-collection/share-list?link=";
		const connectionURL = "&_id=";
		const midIdURL = userId;
		const concatedURL = baseURL + midURL + shareLink + connectionURL + midIdURL; // works, but shareId is null for some reason ?? pending solve
		setShareURL(concatedURL); // I think no need of setState since it's working? shareURL and concatedURL are the same restaurant but different link ??
		console.log("concatedURL ---> " + concatedURL);
		console.log("shareURL ---> " + shareURL);

	}

    const generateRestaurantShareLink = async (url, body) => {
		await axiosInstance.post(url, body)
		.then(function (response) {
			shareLink = response.data;
			console.log('3');
			console.log(response.data);
			console.log("sharelink --> " + shareLink);
			setShareId(shareLink);
			console.log("shareId --> " + shareId);
		
		})
		.catch(function (error) {
			console.log(error);
		});

	}

    return (
        <><div>
            <div className={styles.experience_container}>

                <div className={styles.topExperienceContainer}>
                 <button className={styles.more} onClick={() => {openView(); setShowModal(true);}}  >
                    open
                 </button>
                </div>
            </div>
           
        </div>
        <div>
            <div id={"share" + userId}>
                I am in Share, {shareURL}
         
                    {/* <FormControlLabel disabled control={<Checkbox />} label="shareName" />
                    <FormControlLabel control={<Checkbox checked={checked}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>} label="shareRating" />
                    <FormControlLabel control={<Checkbox checked={checked}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>} label="shareCuisine" /> */}
                    {/* <FormControlLabel control={<Checkbox checked={checked}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>} label="Label" />
                    <FormControlLabel control={<Checkbox checked={checked}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>} label="Label" />
                    <FormControlLabel control={<Checkbox checked={checked}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>} label="Label" /> */}

                    <Checkbox onClick={() => setPriceChecked(true)}
                        checked={checked}
                        onChange={handlesharePriceRating}
                        inputProps={{ 'aria-label': 'controlled' }} label="sharePriceName"
                    />
           
                    
            </div>

        </div>
        {showModal ? (
            <><Button onClick={() => { closeView(); setShowModal(false); } }>
                    close
                </Button><Button onClick={() => clickToShare()} title='Share Record' shareURL={shareURL}>
                        <a title='Share'>
                            <div className={styles.icons}>
                                <img src='/src/nav-icons/share-icon.svg' width='40vw' alt='Share' />

                                <p className='white-space: normal width: 100px'>
                                    Click to Share: {shareURL}
                                </p>
                            </div>
                        </a>
                    </Button></>

        ): null}
            
        </>
        
    )
}