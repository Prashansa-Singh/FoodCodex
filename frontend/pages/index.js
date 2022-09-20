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
				<Stack direction="row" spacing={25} align = 'center'>
					<Button variant="contained">LOGIN</Button>
					<Button variant="contained">SIGN UP</Button>
					<Button variant="contained" size="large">ABOUT</Button>
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

