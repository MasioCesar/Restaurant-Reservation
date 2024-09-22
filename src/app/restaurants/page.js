"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Box, Button, Container } from "@mui/material";
import RestaurantCard from "@/components/restaurantCard";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import AddIcon from '@mui/icons-material/Add'; 
import { useUser } from "../context/UserContext";

const initialRestaurants = [
	{ nome: "Mercato", abre: "17:00", fecha: "23:00", descricao: "Vende pizza, rodizio de comidas, todos os sabores", imagem: "/mercato.jpg", endereco: "Rua dos Bobos, 0" },
	{ nome: "Pasta House", abre: "12:00", fecha: "22:00", descricao: "Especialidades em massas e molhos artesanais", imagem: "/pastahouse.jpg", endereco: "Rua dos Bobos, 0" },
	{ nome: "Sushi Corner", abre: "18:00", fecha: "23:30", descricao: "Oferece uma variedade de sushis e sashimis", imagem: "/sushicorner.jpg", endereco: "Rua dos Bobos, 0" },
	{ nome: "Steak House", abre: "17:00", fecha: "23:00", descricao: "Carnes nobres grelhadas e acompanhamentos", imagem: "/steakhouse.jpg", endereco: "Rua dos Bobos, 0" },
	{ nome: "Taco Bell", abre: "11:00", fecha: "21:00", descricao: "Comida mexicana, tacos e burritos deliciosos", imagem: "/tacobell.jpg", endereco: "Rua dos Bobos, 0" },
	{ nome: "Café Delights", abre: "08:00", fecha: "20:00", descricao: "Cafés, bolos e snacks para todos os gostos", imagem: "/cafedelights.jpeg", endereco: "Rua dos Bobos, 0" },
	{ nome: "Burger King", abre: "10:00", fecha: "22:00", descricao: "Hamburgueres, batatas fritas e milkshakes", imagem: "/tacobell.jpg", endereco: "Rua dos Bobos, 0" },
	{ nome: "Pizzaria do Cheff", abre: "17:00", fecha: "23:00", descricao: "Pizzas artesanais, massas e sobremesas", imagem: "/tacobell.jpg", endereco: "Rua dos Bobos, 0" },
];

export default function Restaurants() {
	const router = useRouter();
	const { user } = useUser();

	const [searchTerm, setSearchTerm] = useState("");
	const [restaurants, setRestaurants] = useState([]);

	const [accessOwner, setAccessOwner] = useState(false);

	useEffect(() => {
        setRestaurants(initialRestaurants);
		if (user?.access === 'owner') {
			setAccessOwner(true);
		}
    }, [user]);

	const handleAddRestaurant = () => {
		router.push(`/form`);
	};

	const filteredRestaurants = restaurants.filter(restaurante =>
		restaurante.nome.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex flex-col h-screen overflow-hidden pb-4 xl:pb-14">
			<Header />
			<div className="flex flex-col md:flex-row justify-between items-center p-4 xl:px-20 2xl:px-96">
				<div className="flex items-center">
					{accessOwner && (
						<Button
							type="submit"
							variant="contained"
							className="h-[48px] bg-[#bc8c4e] hover:bg-[#D58A1E] text-base font-bold rounded font-roboto mb-4 md:mb-0 md:mr-4"
							onClick={handleAddRestaurant}
						>
							<AddIcon className="mr-2" />
							Adicionar Restaurante
						</Button>
					)}
				</div>
				<div className="relative w-full md:w-[450px] group">
					<input
						type="text"
						placeholder="Busque um restaurante"
						className="bg-[#461213] placeholder:text-white placeholder:text-sm p-2 w-full shadow-[8px_8px_12px_rgba(0,0,0,0.2)] 
        rounded-full border-none focus:outline-none transition-transform duration-100 
        pl-12 pr-4 group-hover:bg-[#4b1f1f] hover:bg-[#4b1f1f] h-[48px]"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white transition-colors 
      duration-100 group-hover:text-white hover:text-white" />
				</div>
			</div>
			
			<Box className="flex-grow overflow-y-auto">
				<Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto p-4">
					{filteredRestaurants.map((restaurante, index) => (
						<div className="flex justify-center" key={index}>
							<RestaurantCard restaurante={restaurante} />
						</div>
					))}
				</Container>
			</Box>
		</div>
	);
}