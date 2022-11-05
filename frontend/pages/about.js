import Link from "next/link";
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import abtStyles from '../styles/about.module.css';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { signIn, useSession } from "next-auth/react"

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from '../components/css/header.module.css';
// import Footer from '../components/footer';
import { Grid, Paper, Box, Card } from '@mui/material';


// make about page public, no need of getServerSideProps

export default function About() {

	const title = `${siteTitle} - About`;
	
	return (
		<Layout homeOther>
			<Head>
				<meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
				<title>{title}</title>
			</Head>
	
			<section className={utilStyles.headingMdCenter}>
				<h1>
					About Us
				</h1>
				<Grid align='center'>
					<Paper elevation={10} className={abtStyles.paperStyle}>
						<h5 className={abtStyles.aboutDescrip} id="aboutDescrip">
							FoodCodex is a secure restaurant storing and sharing application. You can keep it to yourself by using just the storing and managing features or make it social by sharing your restaurant records.
							You can also remember your dining experience by creating restaurants and share a restaurant to friends and families. 
						</h5>
						<h5 className={abtStyles.aboutDescrip} id="aboutDescrip">
							You can choose to remove any restaurant and delete any particular experience as well as deleting your account from FoodCodex’s system. Any deletion or removal is permanent because we highly respect our users’ decisions and privacy.
						</h5>
						<h3 className={abtStyles.aboutDescrip} id="aboutDescrip" >So why wait! Sign up to start storing and sharing.</h3>
					</Paper>
				</Grid>
				<h1 >
					Meet Our Developers 
				</h1>
 
				<Box>
					<AccountCircleOutlinedIcon  sx={{ fontSize: 80 }}/>
					<AccountCircleOutlinedIcon  sx={{ fontSize: 80 }}/>
					<AccountCircleOutlinedIcon  sx={{ fontSize: 80 }}/>
					<AccountCircleOutlinedIcon  sx={{ fontSize: 80 }}/>
					<AccountCircleOutlinedIcon  sx={{ fontSize: 80 }}/>
				</Box>
			</section>
		</Layout>
	);
}