import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function Home() {

	return (
		<Layout home>
			<Head>
				<meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMdCenter}>
				<Stack direction="row" spacing={25}>
					<Button 
						className = {utilStyles.homepageButton} 
						variant="contained" style ={{margin: '0 auto', display: "flex"}} 
						onClick={() => {window.location.href= "/login"}}
					>LOGIN</Button>
					<Button 
						className = {utilStyles.homepageButton} 
						variant="contained" style ={{margin: '0 auto', display: "flex"}} 
						onClick={() => {window.location.href= "/signup"}}
					>SIGN UP</Button>
					<Button 
						className = {utilStyles.homepageButton} 
						variant="contained" style ={{margin: '0 auto', display: "flex"}} 
						onClick={() => { window.location.href= "/about"}}size="large"
					>ABOUT</Button>
				</Stack>	
				<section className={utilStyles.content}>
					<img src='/src/homepage-foodpic.jpg' alt="Picture of people enjoying meal and laughing" className={utilStyles.image} />
					<h1>"Laughter is brightest in the place where food is good"</h1>	
				</section>					
			</section>
		</Layout>
	);
}

