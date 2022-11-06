
import ShareOption from './share-option';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Material Ui
import * as React from 'react';


export default function Share({userId, restaurant_data, experiences}) {

    return (
        <>
            <div>
                <ShareOption userId={userId} restaurant_data={restaurant_data} experiences={experiences}/> 
            </div>
        </>
        
    )
}
