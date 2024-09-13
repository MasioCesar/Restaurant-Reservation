"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import Image from "next/image";
import { zoomEffectStyles } from "../styles";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";


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

export default function AvailableTables() {
    const router = useRouter();
    
    const [selectedTable, setSelectedTable] = useState(null);
    const buttonRef = useRef(null);

    const handleSelectTable = (table) => {
        setSelectedTable(table);
    };

    const handleClickOpen = () => {
        router.push("/menuSchedule");
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
                    className={`w-[364px] h-[55px] rounded p-2 ${selectedTable
                        ? "bg-[#bc8c4e] text-white hover:bg-[#D58A1E]"
                        : "bg-[rgba(188,140,78,0.5)] text-[#a9a9a9] hover:bg-[rgba(188,140,78,0.5)]"
                        } mt-4 font-bold cursor-${selectedTable ? "pointer" : "default"}`}
                    onClick={handleClickOpen}
                >
                    Reservar mesa
                </Button>
            </div>
        </div>
    );
}