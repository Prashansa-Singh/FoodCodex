import Link from "next/link";
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import abtStyles from '../components/css/about.module.css';

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
				<Box align='center'>
					<Paper elevation={10} className={abtStyles.aboutPaper}>
						<h5>
							Programming Quokkas are a group of passionate rockstar developers dedicated to bring the best restaurant recording experience for you
						
						</h5>
					</Paper>
				</Box>
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