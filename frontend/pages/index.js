import Head from 'next/head';
// import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import foodPic from '../public/src/homepage-foodpic.jpg'


export default function Home() {

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<Stack direction="row" spacing={25}>
					<Button className = {utilStyles.homepageButton} variant="contained" style ={{margin: '0 auto', display: "flex"}} onClick={() => {
    window.location.href= "/login"}}>LOGIN</Button>
					<Button className = {utilStyles.homepageButton} variant="contained" style ={{margin: '0 auto', display: "flex"}} onClick={() => {
    window.location.href= "/signup"}}>SIGN UP</Button>
					<Button className = {utilStyles.homepageButton} variant="contained" style ={{margin: '0 auto', display: "flex"}} onClick={() => {
    window.location.href= "/about"}}size="large">ABOUT</Button>
	
				</Stack>	
				<h1 classname = {utilStyles.homepageText}>
					"Laughter is brightest in the place where food is good"
				</h1>
				
				<Image
        			src={foodPic}
       				alt="Home page laughter pic"
        			// width={500} automatically provided
        			// height={500} automatically provided
        			// blurDataURL="data:..." automatically provided
        			// placeholder="blur" // Optional blur-up while loading
      			/>
				{/* <p>
					Home page for unauthorised users
				</p> */}
						
			</section>
		</Layout>
	);
}

