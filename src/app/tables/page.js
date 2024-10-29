"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  Grid,
  Container,
  Snackbar,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { zoomEffectStyles } from "../styles";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

const Table = ({ status, onClick, isSelected }) => (
  <Box
    sx={{
      ...(status === "available" ? zoomEffectStyles : {}),
      borderRadius: "8px",
      boxSizing: "border-box",
      boxShadow: isSelected ? "0 0 0 4px rgba(202, 154, 85, 0.90)" : "none",
      opacity: status === "unavailable" ? 0.5 : 1,
      userSelect: "none",
    }}
    className="p-2"
    onClick={status === "available" ? onClick : undefined}
  >
    <div className="flex justify-center m-2">
      <Image
        src={status === "available" ? "/available.png" : "/unavailable.png"}
        alt={status === "available" ? "Disponível" : "Indisponível"}
        width={120}
        height={120}
      />
    </div>
  </Box>
);

const TableDialog = ({ open, onClose, table, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    classes={{
      paper:
        "bg-[#411313] text-white text-center",
    }}
  >
    <DialogTitle className="text-xl md:text-2xl p-4 relative font-bold font-roboto">
      Informações da Mesa {table?.number}
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
        className="absolute right-4 top-2 text-white"
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent className="flex flex-col justify-center items-center p-2 font-roboto">
      <div className="flex items-center py-4">
        <div className="lg:text-xl text-lg p-2">Mesa para quantas pessoas:</div>
        <TextField
          label="Apenas números"
          variant="outlined"
          type="number"
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        className="max-w-[400px] h-[60px] p-8 my-4 bg-[#bc8c4e] hover:bg-[#D58A1E] text-base font-bold rounded font-roboto"
        onClick={onConfirm}
      >
        Continuar Reserva
      </Button>
    </DialogContent>
  </Dialog>
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AvailableTables() {
  const router = useRouter();
  const { setUser } = useUser();
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(today.getHours() - 3); // Ajusta para UTC−3
    return today.toISOString().split('T')[0]; // Formata a data de hoje como YYYY-MM-DD
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const buttonRef = useRef(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [tables, setTables] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSelectTable = (table) => {
    setSelectedTable(table);
  };

  const handleClickOpenDialog = () => {
    if (selectedTable) {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmReservation = () => {
    setDialogOpen(false);
<<<<<<< HEAD
    const userData = {
      time: selectedTime
    };

    setUser(userData); // Salva o horário da reserva no contexto do usuário

    router.push('/menuSchedule');
=======
    router.push(`/menuSchedule?time=${selectedTime}`);
>>>>>>> 6eaaefc2af6938bc7ca12ee29ae818f877fe30e8
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        selectedTable &&
        !event.target.closest(".table-container") &&
        !event.target.closest(".MuiDialog-paper") &&
        !buttonRef.current?.contains(event.target)
      ) {
        setSelectedTable(null);
      }
    },
    [selectedTable]
  );

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      setSelectedTable(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  const isTableAvailable = (table) => {
    if (!selectedDate || !selectedTime) {
      return false;
    }

    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}:00.000Z`);
    return !table.reservations.some((reservationDate) => {
      const reservationDateTime = new Date(reservationDate);
      return reservationDateTime.getTime() === selectedDateTime.getTime();
    });
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const gerarHorariosDisponiveis = (openTime, closeTime) => {
    const horarios = [];
    const startTime = new Date(`1970-01-01T${openTime}:00.000Z`);
    const endTime = new Date(`1970-01-01T${closeTime}:00.000Z`);
    startTime.setMinutes(startTime.getMinutes() + 15); // Start 15 minutes after opening
    endTime.setMinutes(endTime.getMinutes() - 60); // End 1 hour before closing

    while (startTime <= endTime) {
      const hours = String(startTime.getUTCHours()).padStart(2, '0');
      const minutes = String(startTime.getUTCMinutes()).padStart(2, '0');
      horarios.push(`${hours}:${minutes}`);
      startTime.setMinutes(startTime.getMinutes() + 15);
    }

    return horarios;
  };

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem('restaurantId');

    if (storedRestaurantId) {
      const fetchRestaurants = async () => {
        try {
          const response = await fetch(`/api/restaurant/${storedRestaurantId}`);
          const data = await response.json();

          console.log('Dados do restaurante:', data);
          setRestaurant(data);

          // Gerar horários disponíveis
          const horarios = gerarHorariosDisponiveis(data.abre, data.fecha);
          setHorariosDisponiveis(horarios);

          // Definir mesas
          const mesas = data.mesas.map(mesa => ({
            id: mesa.id,
            number: mesa.number,
            reservations: mesa.reservations // Transformar em array de strings
          }));
          setTables(mesas);
        } catch (error) {
          console.error('Erro ao buscar restaurantes:', error);
        }
      };

      fetchRestaurants();
    }
  }, []);

  console.log('Horários disponíveis:', horariosDisponiveis);
  console.log('Mesas:', tables);

  const handleDateChange = (event) => {
    const selectedDateValue = event.target.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(selectedDateValue);
    selectedDate.setDate(selectedDate.getDate() + 1);

    const oneYearFromToday = new Date(today);
    oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

    if (selectedDate < today) {
      setSnackbarMessage("A data selecionada não pode ser anterior a hoje.");
      setOpenSnackbar(true);
    } else if (selectedDate > oneYearFromToday) {
      setSnackbarMessage("A data selecionada não pode ser posterior a 1 ano a partir de hoje.");
      setOpenSnackbar(true);
    } else {
      setSelectedDate(selectedDateValue); // Atualiza a data somente se for válida
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#231013] xl:overflow-hidden">
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          pt: 1
        }}
      >
        <Container maxWidth="lg" className="h-full">
          <div className="text-center text-xl pb-2">
            {!selectedDate || !selectedTime ? (<span className="font-bold lg:text-2xl md:text-2xl text-[#bc8c4e]">
              Selecione o dia e horário da reserva
            </span>) : (undefined)}

          </div>
          <div className="flex items-center gap-4 p-4 pt-2 pb-0">

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md="auto">
                <div className="text-2xl text-white font-bold">
                  Dia e Horário da reserva:
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{ shrink: true }}
                  label="Data"
                  className="bg-[#411313] rounded"
                  fullWidth
                  InputProps={{
                    onClick: (event) => {
                      event.preventDefault(); 
                      event.target.showPicker();
                    },
                  }}
                />
              </Grid>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="label-horario">Horário</InputLabel>
                  <Select
                    labelId="label-horario"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    label="Horário"
                    className="bg-[#411313] rounded"
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {horariosDisponiveis.map((horario) => (
                      <MenuItem key={horario} value={horario}>
                        {horario}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="flex flex-col items-center mt-4">
            {!selectedDate || !selectedTime ? (

              <div className="mt-4">
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                  {tables.map((table) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={table.id} className="table-container opacity-10">
                      <Table
                        status={isTableAvailable(table) ? "available" : "unavailable"}
                        isSelected={selectedTable?.id === table.id}
                        onClick={() => handleSelectTable(table)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <div>
                <div className="text-center text-xl pb-2">
                  <span className="font-bold lg:text-2xl md:text-2xl text-[#bc8c4e]">
                    Selecione uma mesa disponível
                  </span>
                </div>
                <div className="text-white text-xl font-bold flex flex-col items-center justify-center h-full">
                  <div className="mt-4 pt-3">
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                      {tables.map((table) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={table.id} className="table-container">
                          <Table
                            status={isTableAvailable(table) ? "available" : "unavailable"}
                            isSelected={selectedTable?.id === table.id}
                            onClick={() => handleSelectTable(table)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mb-1 pt-[10%] lg:pt-2 2xl:pt-10">
            <Button
              ref={buttonRef}
              variant="contained"
              className={`w-full max-w-[364px] h-[55px] rounded p-2 mt-4 font-bold ${selectedTable
                ? "text-lg font-poppins bg-[#bc8c4e] text-white hover:bg-[#D58A1E]"
                : "text-lg font-poppins bg-[rgba(188,140,78,0.5)] text-[#a9a9a9] hover:bg-[rgba(188,140,78,0.5)]"
                } cursor-${selectedTable ? "pointer" : "not-allowed"}`}
              onClick={handleClickOpenDialog}
              disabled={!selectedTable}
            >
              Reservar Mesa
            </Button>
          </div>
          <TableDialog open={dialogOpen}
            onClose={handleCloseDialog}
            table={selectedTable}
            onConfirm={handleConfirmReservation} />
        </Container>
      </Box>
    </div>
  );
}