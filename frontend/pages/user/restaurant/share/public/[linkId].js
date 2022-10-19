import Head from 'next/head';
import Link from 'next/link';
import { axiosInstance } from '../../../../api/axiosConfig';

// for actual fetching data that renders on the page
// export const getServerSideProps = async (context) => {
//     const {_id} = context.query;
//     const user = '6310521c744ac9f1587375fa';
//     const url =  '/user/restaurant/share/public/6350181bd51fc6a3d14e5ab5'
//     const response = await axiosInstance.get(url, {data: {userId: user, restaurantId: _id,}});
//     const restaurant_data = response.data;
// 	const userId = user;

//     console.log("context: ", context);

//     return{
        
//     };
// }
export const getStaticPaths = async () => {
    // 1.get id dynamically and concat to /user/restaurant
    // 2. data 
    // 3. presenting 
    const res = await axiosInstance.get('/user/restaurant/share/public');
    // const res = await fetch('https://jsonplaceholder.typicode.com/users');
    // const data = await res.json();
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

// // ------------------- Note -------------------------
// // pages are available at build time and ahead of users' request,
// // might need to check if getServerSideProps is more appropriate here
export const getStaticProps = async (params) => {
    console.log("context --->" + params);
    const id = params.linkId; // this was context.params.name
    console.log('context.param.name --->' + id);
    // line 30 id should be unique share link 
    // const res = await fetch('https://jsonplaceholder.typicode.com/users' + id);
    const res = await axiosInstance.get('/user/restaurant/share/public' + id);
    // const data = await res.json();
    const data = res.data;
    console.log("data in getStaticProps--->" + data);

    return {
        props: { shareData: data}
    }
    
}

const restaurantDetails = async ({ shareData }) => {

    return (
        <div>
            <h1>{ shareData} </h1>
            <h1>
                Shared Restaurant
            </h1>
        </div>
    )
}

export default restaurantDetails;