import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

export default function RestaurantCard({ restaurante }) {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleCardClick = () => {
		router.push("/tables");
	};

	const toggleAddress = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<Box
			className="bg-[#461213] w-[360px] h-[370px] transition-transform duration-200 
                hover:scale-[1.03] shadow-[8px_8px_12px_rgba(0,0,0,0.2)]"
		>
			<Image
				onClick={handleCardClick}
				src={restaurante.imagem}
				alt={restaurante.nome}
				width={400}
				height={200}
				className="w-full h-52 object-cover cursor-pointer"
			/>
			<div className="text-white text-[14px] p-4 font-poppins">
				<div className="flex justify-between items-center">
					<h2 className="text-xl pb-1 font-bebas-neue">{restaurante.nome}</h2>
					<Button
						className="bg-[#bc8c4e] text-white hover:bg-[#D58A1E] py-1 px-3 rounded cursor-pointer transition duration-200"
						onClick={toggleAddress}>
						Ver Endereço
					</Button>

				</div>
				<p>Abre: {restaurante.abre}</p>
				<p>Fecha: {restaurante.fecha}</p>
				<p>{restaurante.descricao}</p>

				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={toggleAddress}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Box p={2} sx={{ backgroundColor: '#bc8c4e', color: 'white', font: 'bebas-neue' }}	>
						{restaurante.endereco}
					</Box>
				</Popover>
			</div>
		</Box>
	);
}
