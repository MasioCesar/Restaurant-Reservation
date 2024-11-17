"use client";
import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfileDetails } from '@/components/accountProfileDetails';
import { AccountProfile } from '@/components/accountProfile';
import { Header } from '@/components/header';
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useUserDetails } from '@/lib/getRequests';
import { auth } from '@/lib/firebase'; 
import { onAuthStateChanged } from "firebase/auth";

export default function Account() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true); 
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login"); 
            } else {
                setUserDetails(user);  
                setLoading(false);  
            }
        });

        return () => unsubscribe(); 
    }, [router]);

    const userData = useUserDetails(); 

    if (loading || !userDetails || !userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Head>
                <title>Account</title>
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
                            <AccountProfile userDetails={userData} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Suspense fallback={<div>Carregando...</div>}>
                                <AccountProfileDetails userDetails={userData} />
                            </Suspense>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
