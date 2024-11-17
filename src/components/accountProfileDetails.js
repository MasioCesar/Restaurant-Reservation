import { useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, Tab, Card, Divider, CardContent, Grid, TextField, Box, Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, IconButton } from '@mui/material';
import { differenceInMinutes, parse } from 'date-fns';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useUser } from '../app/context/UserContext';
import { Reservations } from '@/lib/getRequests';
import { GetContext } from "@/lib/getFirebase";

export const AccountProfileDetails = ({ userDetails }) => {
    const router = useRouter();
    const { user, setUser } = useUser();
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const [comandas, setComandas] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reservationToCancel, setReservationToCancel] = useState(null);

    const { cancelReservation } = useContext(GetContext);

    // Carrega as reservas quando o componente é montado
    Reservations(setComandas);

    console.log(comandas)

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
        const reservationDate = comandas[index].reservationDate + " " + comandas[index].reservationTime;
        const currentDate = new Date();
        const minutesDifference = differenceInMinutes(reservationDate, currentDate);
        if (minutesDifference < 1440) { // 1440 minutos = 24 horas
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

        cancelReservation(index);

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
        const newUserData = {
            employeeToken: formData.get('employeeToken'),
        };

        setUser(prevUser => ({
            ...prevUser,         // Mantém os dados anteriores
            ...newUserData      // Adiciona os novos dados
        }));

        showSnackbar("Dados salvos com sucesso!", "success");
    };

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
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
                                    value={userDetails.userName}
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
                                    defaultValue={userDetails.email}
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
                            {comandas.map(({ orders, tableNumber, reservationDate, reservationTime }, index) => (
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
                                            {`Mesa 0${tableNumber}`}
                                        </Box>
                                        <Box>
                                            {`${formatDate(reservationDate)} ${reservationTime}`}
                                        </Box>
                                    </Box>

                                    <Box className="justify-between flex pt-8">
                                        <Box textAlign="left" fontWeight="medium" mb={1} className="w-full">
                                            {orders.map((order, i) => (
                                                <Box key={i}>
                                                    <div className='flex w-full justify-between'>
                                                        <div className='flex'>
                                                            <div className='pr-2'>{`${order.item}`}</div>
                                                            <div className='pr-2'>{`x ${order.quantity}`}</div>
                                                        </div>
                                                        <div className='flex'>
                                                            <div className='pr-2'>{`Horário: ${order.time}`}</div>
                                                            <div className='pr-2'>{`R$${order.price}`}</div>
                                                        </div>
                                                    </div>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box mt={2} display="flex" justifyContent="flex-end">
                                        <Tooltip title="Reservas feitas só podem ser canceladas com antecedência mínima de 24 horas.">
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
                    <DialogContentText color={"while"}>
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