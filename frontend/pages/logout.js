import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../components/css/login-signup.module.css';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { signOut, useSession, getSession } from "next-auth/react"

// Login Page Style
import React from 'react';
import { Typography, Button, Grid, Paper, TextField, Stack, Box } from '@mui/material';


export default function Logout() {
    const { data: session, status } = useSession({
        required: true,
    });

    const router = useRouter();

    const title = `${siteTitle} - Logout`;

    return (
        <Layout home>
            <Head>
                <title>{title}</title>
            </Head>

            <section className={utilStyles.headingMdCenter}>
                <Grid align='center'>
                    <Paper elevation={10} className={Styles.paperStyle}>
                        <h1>Would you like to logout?</h1>

                        <Box>
                            <Button className={Styles.loginButton} variant="contained" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }) }}>Yes logout</Button>
                        </Box>

                        <Box>
                            <Button variant="contained" onClick={() => { router.push('/restaurant-collection/view-restaurant-collection') }}>Cancel</Button>
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