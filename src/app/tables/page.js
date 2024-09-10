"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { zoomEffectStyles } from "../styles";
import { Header } from "@/components/header";


const tables = [
    { id: 1, number: 1, status: "available" },
    { id: 2, number: 2, status: "reserved" },
    { id: 3, number: 3, status: "available" },
    { id: 4, number: 4, status: "reserved" },
    { id: 5, number: 5, status: "available" },
    { id: 6, number: 6, status: "reserved" },
    { id: 7, number: 7, status: "available" },
    { id: 8, number: 8, status: "reserved" },
    { id: 9, number: 9, status: "available" },
    { id: 10, number: 10, status: "reserved" }
];

const Table = ({ status, onClick, isSelected }) => (
    <Box
        sx={{
            ...(status === "available" ? zoomEffectStyles : {}),
            borderRadius: '8px',
            boxSizing: 'border-box',
            boxShadow: isSelected ? '0 0 0 4px rgba(202, 154, 85, 0.90)' : 'none',
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
const TableDialog = ({ open, onClose, table }) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        classes={{ paper: 'bg-[#411313] text-white overflow-hidden text-center w-[90vh] h-[70vh]' }}
    >
        <DialogTitle className="text-2xl p-4 relative font-bold">
            Detalhes da Mesa {table?.number}
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
        <DialogContent className="flex flex-col justify-center items-center h-full p-2">
            <div className="text-4xl text-white font-bold">
                Informações da mesa
            </div>
            <div className="flex items-center py-10">
                <div className="text-xl">
                    Mesa com 4 lugares
                </div>
            </div>
            <Button
                type="submit"
                variant="contained"
                className="w-[400px] h-[60px] py-2 text-base mt-40 bg-[#bc8c4e] hover:bg-[#D58A1E] font-bold rounded"
            >
                Confirmar reserva
            </Button>
        </DialogContent>
    </Dialog>
);

export default function AvailableTables() {
    const [open, setOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const buttonRef = useRef(null);

    const handleSelectTable = (table) => {
        setSelectedTable(table);
    };

    const handleClickOpen = () => {
        if (selectedTable) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOutside = useCallback((event) => {
        if (selectedTable &&
            !event.target.closest('.table-container') &&
            !event.target.closest('.MuiDialog-paper') &&
            !buttonRef.current?.contains(event.target)) {
            setSelectedTable(null);
        }
    }, [selectedTable]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            setSelectedTable(null);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClickOutside, handleKeyDown]);

    return (
        <div className="flex flex-col h-screen w-full bg-[#231013]">
            {/* Parte de cima */}
            <Header />

            {/* Parte de baixo */}
            <div className="py-8 px-4">
                <div className="text-2xl text-white font-bold pl-16">
                    Dia e Horário da reserva:
                </div>
            </div>

            <div className="h-[80%] px-4">
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-5 gap-8 py-10">
                        {tables.map((table) => (
                            <div key={table.id} className="table-container">
                                <Table
                                    status={table.status}
                                    isSelected={selectedTable?.id === table.id}
                                    onClick={() => handleSelectTable(table)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-4">
                <Button
                    ref={buttonRef}
                    variant="contained"
                    className={`w-[364px] h-[55px] flex-shrink-0 rounded-[5px] p-2 ${selectedTable
                        ? "bg-[#bc8c4e] text-white hover:bg-[#D58A1E]"
                        : "bg-[rgba(188,140,78,0.5)] text-[#a9a9a9] hover:bg-[rgba(188,140,78,0.5)]"
                        } mt-4 font-bold cursor-${selectedTable ? "pointer" : "default"}`}
                    onClick={handleClickOpen}
                >
                    Reservar mesa
                </Button>
            </div>

            <TableDialog open={open} onClose={handleClose} table={selectedTable} />
        </div>
    );
}