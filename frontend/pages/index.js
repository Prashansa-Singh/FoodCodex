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

                <img src='/src/homepage-foodpic.jpg' alt="Home page laughter pic" className={utilStyles.image} />						
			</section>
		</Layout>
	);
}

