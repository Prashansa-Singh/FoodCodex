import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../components/css/login-signup.module.css';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { signOut, useSession } from "next-auth/react"

// Login Page Style
import React from 'react';
import { Typography, Button, Grid, Paper, TextField, Stack, Box } from '@mui/material';


export default function Logout() {
    // const { data: session, status } = useSession({
    //     required: true,
    // });

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
                            <Button type="submit" className={Styles.loginButton} variant="contained" onClick={() => signOut({ callbackUrl: '/' })}>Yes logout</Button>
                        </Box>

                        <Box>
                            <Button type="submit" variant="contained" onClick={() => router.push('/')}>Cancel</Button>
                        </Box>

                    </Paper>
                </Grid>
            </section>
        </Layout >
    );
}