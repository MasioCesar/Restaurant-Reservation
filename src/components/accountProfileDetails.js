import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, Tab, Card, Divider, CardContent, Grid, TextField, Box, Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, IconButton } from '@mui/material';
import { differenceInMinutes, parse } from 'date-fns';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useUser } from '../app/context/UserContext';

export const AccountProfileDetails = () => {
    const router = useRouter();
    const { setUser } = useUser();
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const [comandas, setComandas] = useState([
        { pratos: ["Macarronada", "Água com gás", "Parmegiana"], status: ["19:20", "19:20", "19:50"], mesa: 1, data: "21/09/2024 19:00" },
        { pratos: ["Macarronada", "Água com gás", "Parmegiana"], status: ["19:20", "19:20", "19:50"], mesa: 1, data: "21/09/2024 22:00" },
    ]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reservationToCancel, setReservationToCancel] = useState(null);

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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message, severity = 'info') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };


    const handleCancelReservation = (index) => {
        const reservationDate = parse(comandas[index].data, 'dd/MM/yyyy HH:mm', new Date());
        const currentDate = new Date(); 
        const minutesDifference = differenceInMinutes(reservationDate, currentDate);

        if (minutesDifference < 1440) { // 24 horas = 1440 minutos
            showSnackbar("Não é possível cancelar reservas com menos de 24 horas de antecedência.", "warning");
            return;
        }

        setReservationToCancel(index);
        setDialogOpen(true);
    };


    const handleConfirmCancel = () => {
        const index = reservationToCancel;
        const updatedComandas = [...comandas];
        updatedComandas.splice(index, 1);
        setComandas(updatedComandas);
        showSnackbar("Sua reserva foi cancelada com sucesso.", "success");
        setDialogOpen(false);
        setReservationToCancel(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setReservationToCancel(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita o recarregamento da página

        const formData = new FormData(event.target);
        const userData = {
            employeeToken: formData.get('employeeToken'),
        };

        setUser(userData);        

        // Exibe uma Snackbar de sucesso
        showSnackbar("Dados salvos com sucesso!", "success");
    };

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                            <Grid item md={6} xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Junte-se a um restaurante"
                                    name="employeeToken"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                )}

                {selectedTab === 1 && (
                    <CardContent>
                        <Box className="px-4 border rounded border-[#231013]">
                            {comandas.map(({ pratos, status, mesa, data }, index) => (
                                <Box
                                    key={index}
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
                                        className="rounded"
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

                                    <Box mt={2} display="flex" justifyContent="flex-end">
                                        <Tooltip title="Reservas feitas só podem ser canceladas antes de completarem 24 horas.">
                                            <IconButton>
                                                <InfoOutlinedIcon fontSize="small" sx={{ color: '#CA9A55' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleCancelReservation(index)}
                                        >
                                            Cancelar reserva
                                        </Button>
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

            {/* Snackbar para feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Diálogo de confirmação */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirmar Cancelamento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza de que deseja cancelar esta reserva?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmCancel} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};