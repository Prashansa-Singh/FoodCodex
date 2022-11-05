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
import Checkbox from '@mui/material/Checkbox';


export default function Share({userId, restaurant_data, experiences}) {

    console.log("6 Share " + userId );
    console.log("6 Share " + restaurant_data );
    console.log("6 Share " + experiences);

    return (
        <>
        <div>
            <ShareOption userId={userId} restaurant_data={restaurant_data} experiences={experiences}/> 
        </div>
    
        </>
        
    )
}
