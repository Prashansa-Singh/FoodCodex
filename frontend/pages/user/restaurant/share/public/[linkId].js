import Head from 'next/head';
import Link from 'next/link';

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/user/restaurant/share/public');
    const data = await res.json();

    const paths = data.map(shareData => {
        return {
            params: {id: shareData.restaurantId.toString() }
        }
    })

    return {
        paths, 
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:3000/user/restaurant/share/public/' + id);
    const data = await res.json();

    return {
        props: { shareData: data}
    }
    
}

const restaurantDetails = ({ shareData }) => {
    return (
        <div>
            <h1>{ shareData.restaurantId } </h1>
        </div>
    )
}

export default restaurantDetails;