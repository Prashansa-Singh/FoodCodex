import { useState } from 'react';
import { axiosInstance } from './../pages/api/axiosConfig';

import styles from './css/share.module.css';
import experienceStyles from './css/experience.module.css';
import Image from "next/image";
import happyMan from "../public/src/happy.png";
import { FormGroup, FormControlLabel , Button, Typography, Checkbox } from "@mui/material";

export default function SharePresent({userId, restaurant_data, experiences}) {

    // for presenting share link view 
    const closePresentShareLinkView = () => {
        const viewId = "present" + userId;
        document.getElementById(viewId).style.display="none";
    }

    const openPresentShareLinkView = () =>{
        const viewId = "present" + userId;
        document.getElementById(viewId).style.display="flex";
    }

    // for presenting share option view
    const closeOptionView = () => {
        const viewId = "option" + userId;
        document.getElementById(viewId).style.display="none";
    }

    // --------------------- selecting share options -----------------------
    const [shareRating, setShareRating] = useState(false);
    const [priceRating, setPriceRating] = useState(false);
    const [shareCuisine, setShareCuisine] = useState(false);
    const [shareAdrs, setShareAdrs] = useState(false);
    const [shareTags, setShareTags] = useState(false);

    const handleshareRating = (event) => {
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
        } else {
            console.log('⛔️ Checkbox is NOT checked');
        }
        setShareRating(current => !current);
    };

    const handlesharePriceRating = (event) => {
        setPriceRating(current => !current);
    };

    const handleShareCuisine = (event) => {
        setShareCuisine(current => !current);
    };

    const handleShareAdrs = (event) => {
        setShareAdrs(current => !current);
    };

    const handleShareTags = (event) => {
        setShareTags(current => !current);
    };


     // -------------------------- sharing --------------------------
	const [shareId, setShareId] = useState(null);
	const [shareURL, setShareURL] = useState(null);
	let shareLink;

	const clickToShare = async() => {
		
		const body = {
			senderId: userId,
			restaurantId: restaurant_data._id,
			shareName: true,
			shareRating: shareRating,
			sharePriceRating: priceRating,
			shareCuisine: shareCuisine,
			shareAddress: shareAdrs,
			shareOptionTags: shareTags
		};
		
		console.log("2");
		// has share id 
		const URL = '/user/restaurant/share/generate-link';
		await generateRestaurantShareLink(URL, body);
	
		// present full share link
		const baseURL = (process.env.NODE_ENV == "production") ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND : process.env.NEXT_PUBLIC_DEVELOPMENT_FRONTEND; //backend to frontend 
		const linkURL = "restaurant-collection/share-list?link=";
		const _idURL = "&_id=";
		const userIdURL = userId;
		const concatedURL = baseURL + linkURL + shareLink + _idURL + userIdURL; // works, but shareId is null for some reason ?? pending solve
		setShareURL(concatedURL); // I think no need of setState since it's working? shareURL and concatedURL are the same restaurant but different link ??
		console.log("shareURL ---> " + shareURL);

	}

    const generateRestaurantShareLink = async (url, body) => {
		await axiosInstance.post(url, body)
		.then(function (response) {
			shareLink = response.data;
			console.log('3');
			setShareId(shareLink);

		
		})
		.catch(function (error) {
			console.log(error);
		});

	}

    return (
        <>
            <div>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={shareRating} onChange={handleshareRating}/>} label="Share Rating"/>
                    <FormControlLabel control={<Checkbox checked={priceRating} onChange={handlesharePriceRating}/>} label="Share Price Rating"/>
                    <FormControlLabel control={<Checkbox checked={shareCuisine} onChange={handleShareCuisine}/>} label="Share Cuisine"/>
                    <FormControlLabel control={<Checkbox checked={shareAdrs} onChange={handleShareAdrs}/>} label="Share Address"/>
                    <FormControlLabel control={<Checkbox checked={shareTags} onChange={handleShareTags}/>} label="Share Tags"/>
                </FormGroup>
    
            </div>
            <div>
                <Button className={styles.confirmButton} variant="outlined" onClick={() => { openPresentShareLinkView(); clickToShare(); } }>
                    confirm
                </Button>
            </div>

            <div className={styles.view_share_present} id={"present" + userId}>
                <Image src={happyMan} width={100} height={100} objectFit="contain"/>
                    <p className={styles.viewLink}>
                        Here's your share link:
                        <p>{shareURL}</p>
                        Congratulations!
                    </p> 
                <Button variant="outlined" onClick={() => { closePresentShareLinkView(); closeOptionView(); } }>
                    Done
                </Button>

            </div>
            
        
        </>
    )
}