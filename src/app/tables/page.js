"use client";
import { useState, useRef, useEffect, useCallback } from "react";
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
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { zoomEffectStyles } from "../styles";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";

const tables = [
  { id: 1, number: 1, reservations: [{ date: "2024-09-17T17:00:00.000Z" }] },
  { id: 2, number: 2, reservations: [{ date: "2024-09-17T17:00:00.000Z" }] },
  { id: 3, number: 3, reservations: [{ date: "2024-09-17T17:00:00.000Z" }] },
  { id: 4, number: 4, reservations: [{ date: "2024-09-17T17:00:00.000Z" }] },
  { id: 5, number: 5, reservations: [{ date: "2024-09-17T18:00:00.000Z" }] },
  { id: 6, number: 6, reservations: [] },
  { id: 7, number: 7, reservations: [] },
  { id: 8, number: 8, reservations: [] },
  { id: 9, number: 9, reservations: [{ date: "2024-09-17T19:00:00.000Z" }] },
  { id: 10, number: 10, reservations: [] },
  { id: 11, number: 11, reservations: [] },
  { id: 12, number: 12, reservations: [] },
];

const horariosDisponiveis = ["17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00",
  "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00"
];

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

export default function AvailableTables() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const buttonRef = useRef(null);

  const handleSelectTable = (table) => {
    setSelectedTable(table);
  };

  const handleClickOpen = () => {
    router.push("/menuSchedule");
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
    return !table.reservations.some((reservation) => {
      const reservationDate = new Date(reservation.date);
      return reservationDate.getTime() === selectedDateTime.getTime();
    });
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
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
                  onChange={(e) => setSelectedDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  label="Data"
                  className="bg-[#411313] rounded"
                  fullWidth
                />
              </Grid>
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
                    Selecione a mesa disponível
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
              onClick={handleClickOpen}
              disabled={!selectedTable}
            >
              Reservar Mesa
            </Button>
          </div>


        </Container>
      </Box>
    </div>
  );
}