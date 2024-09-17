"use client"
import { Header } from "@/components/header";
import { Box, Container } from "@mui/material";

const restaurantes = [
    { nome: "Mercato", abre: "17:00", fecha: "23:00", descricao: "Vende pizza, rodizio de comidas, todos os sabores" },
]

export default function Restaurants() {

    return (
        <>
            <Header />

            <Box>
                <Container className="flex p-4 h-full justify-center items-center gap-4">
                    {restaurantes.map((restaurante) => (
                        <Box className="bg-[#461213] w-[400px] h-[400px] items-center justify-center" key={restaurante}>



                        </Box>
                    ))}
                </Container>
            </Box>
        </>
    )
}