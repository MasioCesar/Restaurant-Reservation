import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, Tab, Card, Divider, CardContent, Grid, TextField, Box, Button, Typography } from '@mui/material';

export const AccountProfileDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);

    const comandas = [
        { pratos: ["Macarronada", "Água com gás", "Parmegiana"], status: ["19:20", "19:20", "19:50"], mesa: 1, data: "17/09/2024 19:00" },
    ];

    useEffect(() => {
        const section = searchParams.get('section');
        if (section === 'reservas') {
            setSelectedTab(1);
        } else {
            setSelectedTab(0);
        }
    }, [searchParams]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        if (newValue === 1) {
            router.push("/account?section=reservas");
        } else {
            router.push("/account");
        }
    };

    return (
        <form autoComplete="off" noValidate>
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Profile and Reservations tabs">
                        <Tab label="Profile" />
                        <Tab label="Suas Reservas" />
                    </Tabs>
                </Box>

                {selectedTab === 0 && (
                    <CardContent>
                        <Grid container spacing={0.5}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Nome completo"
                                    name="userName"
                                    value="Ranilson Oscar Araujo Paiva"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    disabled
                                    name="email"
                                    defaultValue="ranilson@ic.ufal.br"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Número do telefone"
                                    name="phone"
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                )}

                {selectedTab === 1 && (
                    <CardContent>
                        <Box className="px-4 border border-[#231013]">
                            {Object.entries(comandas).map(([i, { pratos, status, mesa, data }]) => (
                                <Box
                                    p={2}
                                    borderRadius={2}
                                    border="1px solid #411313"
                                    bgcolor="#411313"
                                    color="white"
                                    position="relative"
                                    fontFamily="Poppins, sans-serif"
                                    display="flex"
                                    flexDirection="column"
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        bgcolor="#F3DFA0"
                                        color="black"
                                        px={2}
                                        py={0.5}
                                        fontSize="18px"
                                        fontWeight="bold"
                                    >
                                        <Box>
                                            {`Mesa 0${mesa}`}
                                        </Box>
                                        <Box>
                                            {`${data}`}
                                        </Box>
                                    </Box>

                                    <Box className="justify-between flex pt-8">
                                        <Box textAlign="left" fontWeight="medium" mb={1}>
                                            {pratos.map((prato, i) => (
                                                <Box key={i}>{prato}</Box>
                                            ))}
                                        </Box>
                                        <Box textAlign="right" fontWeight="medium">
                                            {status.map((st, i) => (
                                                <Box key={i}>{st}</Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                )}

                <Divider />
                {selectedTab === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button type="submit" color="primary" variant="contained">
                            Salvar dados
                        </Button>
                    </Box>
                )}
            </Card>
        </form>
    );
};
