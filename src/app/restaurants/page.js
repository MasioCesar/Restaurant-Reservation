"use client"
import { useState } from "react";
import { Header } from "@/components/header";
import { Box, Container } from "@mui/material";
import RestaurantCard from "@/components/restaurantCard"; 
import SearchIcon from '@mui/icons-material/Search';


const restaurantes = [
    { nome: "Mercato", abre: "17:00", fecha: "23:00", descricao: "Vende pizza, rodizio de comidas, todos os sabores", imagem: "/mercato.jpg" },
    { nome: "Pasta House", abre: "12:00", fecha: "22:00", descricao: "Especialidades em massas e molhos artesanais", imagem: "/pastahouse.jpg" },
    { nome: "Sushi Corner", abre: "18:00", fecha: "23:30", descricao: "Oferece uma variedade de sushis e sashimis", imagem: "/sushicorner.jpg" },
    { nome: "Steak House", abre: "17:00", fecha: "23:00", descricao: "Carnes nobres grelhadas e acompanhamentos", imagem: "/steakhouse.jpg" },
    { nome: "Taco Bell", abre: "11:00", fecha: "21:00", descricao: "Comida mexicana, tacos e burritos deliciosos", imagem: "/tacobell.jpg" },
    { nome: "Café Delights", abre: "08:00", fecha: "20:00", descricao: "Cafés, bolos e snacks para todos os gostos", imagem: "/cafedelights.jpeg" },
];

export default function Restaurants() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRestaurants = restaurantes.filter(restaurante =>
        restaurante.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />

            <Box>
                <div className="flex justify-end p-4">
                    <div className="relative w-[450px] group">
                        <input
                            type="text"
                            placeholder="Busque um restaurante"
                            className="bg-[#461213] placeholder:text-gray-600 placeholder:text-sm p-2 w-full my-4 shadow-[8px_8px_12px_rgba(0,0,0,0.2)] 
                            rounded-full border-none focus:outline-none transition-transform duration-100 
                            pl-12 pr-4 group-hover:bg-[#4b1f1f] hover:bg-[#4b1f1f]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 transition-colors 
                        duration-100 group-hover:text-gray-600 hover:text-gray-600" />
                    </div>
                </div>
                <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto p-4 h-full">
                    {filteredRestaurants.map((restaurante, index) => (
                        <div className="flex justify-center" key={index}>
                            <RestaurantCard restaurante={restaurante} />
                        </div>
                    ))}
                </Container>
            </Box>
        </>
    )
}