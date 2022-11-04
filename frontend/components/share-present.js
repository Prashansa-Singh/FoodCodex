import styles from './css/share.module.css';
import experienceStyles from './css/experience.module.css';
import Image from "next/image";
import happyMan from "../public/src/happy.png";
import { Modal, Box, Button, Typography, Checkbox } from "@mui/material";

export default function SharePresent({userId, restaurant_data, experiences}) {

    // for presenting share link view 
    const closePresentShareLinkView = () => {
        const viewId = "present" + userId;
        document.getElementById(viewId).style.display="none";
    }

    const openPresentShareLinkView = () =>{
        const viewId = "present" + userId;
        console.log("in present --> " + viewId);
        document.getElementById(viewId).style.display="flex";
    }

    // for selecting share option view
    const closeOptionView = () => {
        const viewId = "option" + userId;
        document.getElementById(viewId).style.display="none";
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
		const linkURL = "restaurant-collection/share-list?link=";
		const _idURL = "&_id=";
		const userIdURL = userId;
		const concatedURL = baseURL + linkURL + shareLink + _idURL + userIdURL; // works, but shareId is null for some reason ?? pending solve
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
        <>
            <div>
                <Button onClick={() => { openPresentShareLinkView() } }>
                    confirm
                </Button>
            </div>
            <div className={styles.view_share_present} id={"present" + userId}>
                <Image src={happyMan} width={100} height={100} objectFit="contain" />
                    shareURL 
                <Button onClick={() => { openPresentShareLinkView() } }>
                    Done
                </Button>

            </div>
            
        
        </>
    )
}