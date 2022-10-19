import Head from 'next/head';
import Link from 'next/link';
import { axiosInstance } from '../../../../api/axiosConfig';

export const getStaticPaths = async () => {
    // 1.get id dynamically and concat to /user/restaurant
    // 2. data 
    // 3. presenting 
    const res = await axiosInstance.get('/user/restaurant/share/public');
    console.log('here');
    console.log('res --->' + res);
    const data = res.data;
    console.log('data --->' + data);
    const paths = data.map(shareData => {
        // console.log('Error parsing JSON from response:', resClone );
        return {
            // linkId needs to be the same as page setup name 
            params: {linkId: shareData.name.toString() }
        }
    })

    // { fallback: false } means if it's other routes will return 404
    return {
        paths, 
        fallback: false
    }
}

// ------------------- Note -------------------------
// pages are available at build time and ahead of users' request,
// might need to check if getServerSideProps is more appropriate here
export const getStaticProps = async (context) => {
    console.log("context --->" + context);
    const id = context.params.linkId; // this was context.params.name
    console.log('context.param.name --->' + id);
    // line 30 id should be unique share link 
    const res = await axiosInstance.get('/user/restaurant/share/public' + id);
    const data = res.data;
    console.log("data in getStaticProps--->" + data);

    return {
        props: { shareData: "data"}
    }
    
}

const restaurantDetails = ({ shareData }) => {
    return (
        <div>
            <h1>{ shareData } </h1>
            <h1>
                Shared Restaurant
            </h1>
        </div>
    )
}

export default restaurantDetails;