import { Grid, Paper, Box, Card } from '@mui/material';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import abtStyles from '../components/css/about.module.css';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from "next/link";
import styles from '../components/css/header.module.css';
import Footer from '../components/footer';


const navLink = [
    {
        href: '/',
        // title: 'Home',
        icon: '/src/nav-icons/home-icon.svg',
    }
]

export default function About() {
	const title = `${siteTitle} - About`;
	return (
		<Layout home>
			<Head>
				<title>{title}</title>
			</Head>
	
			<section className={utilStyles.headingMd}>
				{navLink.map(({ href, title, icon }) => (
					<Link href={href}>
						<a>
							<div className={styles.icons}>
								{/* {title} */}
								<img src={icon} />
							</div>
						</a>
					</Link>
				))}
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
			<Footer></Footer>
		</Layout>
	);
}