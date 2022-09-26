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
					<Button className = {utilStyles.homepageButton} variant="contained" style ={{margin: '0 auto', display: "flex"}}>LOGIN</Button>
					<Button className = {utilStyles.homepageButton} variant="contained" style ={{margin: '0 auto', display: "flex"}}>SIGN UP</Button>
					<Button className = {utilStyles.homepageButton} variant="contained" style ={{margin: '0 auto', display: "flex"}} size="large">ABOUT</Button>
				</Stack>	
				<h1>
					"Laughter is brightest in the place where food is good"
				</h1>

				<p>
					Home page for unauthorised users
				</p>
			</section>
		</Layout>
	);
}

