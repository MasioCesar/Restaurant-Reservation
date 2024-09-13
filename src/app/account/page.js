"use client"
import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfileDetails } from '@/components/accountProfileDetails';
import { AccountProfile } from '@/components/accountProfile';
import { Header } from '@/components/header';

export default function Account() {

    return (
        <>
            <Header />
            <Head>
                <title>
                    Account
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Account
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <AccountProfile />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}