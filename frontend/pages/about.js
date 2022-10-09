import { Grid, Paper, Box, Card } from '@mui/material';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function About() {
	const title = `${siteTitle} - About`;
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<h1 classname = {utilStyles.homepageText}>
					About Us
				</h1>
				<Box align='center'>
					<Paper elevation={10} className={utilStyles.aboutPaper}>
						<h5>
							Programming Quokkas are a group of passionate rockstar developers dedicated to bring the best restaurant recording experience for you
						
						</h5>
					
					</Paper>
				</Box>

				<h1 classname = {utilStyles.homepageText}>
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