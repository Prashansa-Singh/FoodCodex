import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../styles/login-signup.module.css';

import { useRouter } from 'next/router';
import { signOut, useSession, getSession } from "next-auth/react"

// Login Page Style
import React from 'react';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';


export default function Logout() {
    const { data: session, status } = useSession({
        required: true,
    });

    const router = useRouter();

    const title = `${siteTitle} - Logout`;

    return (
        <Layout home>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>{title}</title>
            </Head>

            <section className={utilStyles.headingMdCenter}>
                <Grid align='center'>
                    <Paper elevation={10} className={Styles.paperStyle}>
                        <h1>Are you sure you want to logout?</h1>

                        <Box>
                            <Button className={Styles.loginButton} variant="contained" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }) }}>Yes logout</Button>
                            <Button className={Styles.newHereButton} variant="contained" onClick={() => { router.push('/restaurant-collection/view-restaurant-collection') }}>Cancel</Button>
                        </Box>
                    </Paper>
                </Grid>
            </section>
        </Layout >
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    return {
        props: {}
    }
}