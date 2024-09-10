"use client";
import { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';

export default function LayoutPage() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const textos = [
		["Macarronada", "Água com gás", "Parmegiana"],
		["Pizza da frango", "Água com gás", "Mousse de maracujá"],
		["Lasanha", "Água com gás", "Parmegiana"],
		["Pizza da calabresa", "Macarronada", "Mousse de maracujá"],
	];

	const status = [
		["19:20", "19:20", "19:50"],
		["Entregue", "Entregue", "19:50"],
		["Entregue", "19:20", "19:30"],
		["20:00", "21:10", "22:00"],
	];

	return (
		<div className="flex flex-col h-screen w-full bg-[#231013]">
			{/* Parte de cima */}
			<div className="bg-[#411313] relative flex items-center pl-4">
				<Image
					src="/logo.png"
					alt="ICBuffet"
					width={90}
					height={90}
				/>
			</div>

			{/* Parte de baixo */}
			<div className="py-4 px-4">
				<div className="text-2xl text-white font-bold text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
					COMANDAS
				</div>
			</div>

			<div className="px-4 flex flex-col w-full">
				<div
					className="flex w-full items-center justify-center"
					style={{ fontFamily: 'Poppins, sans-serif' }}
				>
					<div
						className="bg-[#F3DFA0] text-black text-xl font-semibold p-3 px-[9%] rounded-md "
					>
						MESAS
					</div>
				</div>
				<div className="flex flex-col items-center">
					<div
						className="w-[90%] flex justify-center"
					>
						<div className="grid grid-cols-3 gap-4 mt-2">
							{textos.map((linhas, index) => (
								<Box
									key={index}
									className="flex items-center p-16 relative rounded-lg border border-[#411313] bg-[#411313] text-white text-xl font-semibold"
									sx={{ fontFamily: 'Poppins, sans-serif' }}
								>
									<Box
										className="absolute top-0 left-0 flex items-center justify-center bg-[#F3DFA0] text-black text-xl font-semibold px-4 py-1"
										sx={{ fontFamily: 'Beabas Neue, sans-serif' }}
									>
										{`0${index + 1}`}
									</Box>
									<div className="flex flex-row items-center justify-center w-full">
										<div style={{ textAlign: 'left', lineHeight: '1.8', flex: 1, fontFamily: 'Poppins, sans-serif' }}>
											{linhas.map((linha, i) => (
												<div key={i}>{linha}</div>
											))}
										</div>
										{/* Adiciona os status ao lado direito do texto */}
										<div style={{ textAlign: 'right', lineHeight: '1.8', fontFamily: 'Poppins, sans-serif' }}>
											{status[index].map((st, i) => (
												<div key={i}>
													{st}
												</div>
											))}
										</div>
									</div>
								</Box>
							))}
						</div>
					</div>
				</div>
			</div>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
				sx={{
					'& .MuiDialog-paper': {
						backgroundColor: '#411313',
						color: 'white',
						overflow: 'hidden',
						textAlign: 'center',
						width: '90vh',
						height: '80vh',
					},
				}}
			>
				<DialogTitle
					sx={{
						fontSize: '1.5rem',
						padding: '16px',
						position: 'relative',
						fontWeight: 'bold',
						fontFamily: 'Poppins, sans-serif'
					}}
				>
					Título do Diálogo
					<IconButton
						edge="end"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
						sx={{
							position: 'absolute',
							right: 14,
							top: 2,
							color: 'white',
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						padding: 2,
						fontFamily: 'Beabas Neue, sans-serif'
					}}
				>
					<div className="text-4xl text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
						Conteúdo do Diálogo
					</div>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							padding: 2,
							mt: 4,
							bgcolor: "#bc8c4e",
							"&:hover": {
								bgcolor: "#D58A1E"
							},
							fontFamily: 'Poppins, sans-serif'
						}}
						className="bg-[#bc8c4e] hover:bg-[#D58A1E] font-bold"
					>
						Botão de Ação
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
}


