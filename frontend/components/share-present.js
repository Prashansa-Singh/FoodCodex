import { useState } from 'react';
import { axiosInstance } from './../pages/api/axiosConfig';

import styles from './css/share.module.css';
import Image from "next/image";
import foodcodexIcon from "../public/src/foodcodex-icon.png";
import { FormControlLabel , Button, Typography, Checkbox, Box, Grid} from "@mui/material";



export default function SharePresent({userId, restaurant_data}) {


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
		
		// has share id 
		const URL = '/user/restaurant/share/generate-link';
		await generateRestaurantShareLink(URL, body);
	
		// present full share link
		const baseURL = (process.env.NODE_ENV == "production") ? process.env.NEXT_PUBLIC_PRODUCTION_FRONTEND : process.env.NEXT_PUBLIC_DEVELOPMENT_FRONTEND; //backend to frontend 
		const linkURL = "restaurant-collection/share-list?link=";
		const _idURL = "&_id=";
		const userIdURL = userId;
		const concatedURL = baseURL + linkURL + shareLink + _idURL + userIdURL; 
		setShareURL(concatedURL); 

	}

    const generateRestaurantShareLink = async (url, body) => {
		await axiosInstance.post(url, body)
		.then(function (response) {
			shareLink = response.data;
			setShareId(shareLink);

		
		})
		.catch(function (error) {
			console.log(error);
		});

	}

    return (
        <>
            <div>
                <Grid align='space-between'>
                    <FormControlLabel control={<Checkbox checked={shareRating} onChange={handleshareRating}  />} label={<Typography className={styles.checkboxFont} >Share Rating</Typography>}/>
                    <FormControlLabel control={<Checkbox checked={priceRating} onChange={handlesharePriceRating}/>} label="Share Price Rating"/>
                    <FormControlLabel control={<Checkbox checked={shareCuisine} onChange={handleShareCuisine}/>} label="Share Cuisine"/>
                    <FormControlLabel control={<Checkbox checked={shareAdrs} onChange={handleShareAdrs}/>} label="Share Address"/>
                    <FormControlLabel control={<Checkbox checked={shareTags} onChange={handleShareTags}/>} label="Share Tags"/>
                </Grid>
    
            </div>
            <Box>
                <div className={styles.formButtons}>
                    <Button className={styles.confirmButton} onClick={() => { openPresentShareLinkView(); clickToShare(); } }>
                        <b className={styles.textButton}>Submit</b>
                    </Button>
                </div>
                <div className={styles.view_share_present} id={"present" + userId}>
                    <Image src={foodcodexIcon} width={100} height={100} objectFit="contain"/>
                        <p className={styles.viewLink}>
                            Here's your share link:
                            <p>{shareURL}</p>
                            Congratulations!
                        </p> 
                    <div className={styles.formButtons}>        
                        <Button className={styles.confirmButton} onClick={() => { closePresentShareLinkView(); closeOptionView(); } }>
                            <b className={styles.textButton}>Done</b>
                        </Button>
                    </div>
                </div>
            </Box>
            
        
        </>
    )
}