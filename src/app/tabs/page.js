"use client";
import { Box, Grid } from "@mui/material";
import { Header } from "@/components/header";

export default function LayoutPage() {

	const comandas = [
		{ pratos: ["Macarronada", "Água com gás", "Parmegiana"], status: ["19:20", "19:20", "19:50"], mesa: 1 },
		{ pratos: ["Pizza de frango", "Água com gás", "Mousse de maracujá"], status: ["Entregue", "Entregue", "19:50"], mesa: 2 },
		{ pratos: ["Macarronada", "Água com gás", "Parmegiana"], status: ["19:20", "19:20", "19:50"], mesa: 2 },
		{ pratos: ["Lasanha", "Água com gás", "Parmegiana"], status: ["Entregue", "19:20", "19:30"], mesa: 3 },
		{ pratos: ["Pizza de calabresa", "Macarronada", "Mousse de maracujá"], status: ["20:00", "21:10", "22:00"], mesa: 4 },
	  ];

	return (
		<div className="flex flex-col h-screen w-full bg-[#231013]">
			<Header />

			<div className="py-4 px-4">
				<Box textAlign="center" fontWeight="bold" fontSize="24px" color="white" fontFamily="Poppins, sans-serif">
					COMANDAS
				</Box>
			</div>

			<Box px={4} flexGrow={1}>
				<Box display="flex" justifyContent="start" mb={2}>
					<Box className="bg-[#F3DFA0] text-black p-2 px-6 rounded font-bold font text-xl">
						MESAS
					</Box>
				</Box>

				<Grid container spacing={2} justifyContent="start">
					{Object.entries(comandas).map(([i, { pratos, status, mesa }]) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={i}>
							<Box
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
									position="absolute"
									top={0}
									left={0}
									bgcolor="#F3DFA0"
									color="black"
									px={2}
									py={0.5}
									fontSize="18px"
									fontWeight="bold"
								>
									{`0${mesa}`}
								</Box>
								<Box className="justify-between flex pt-8">
									<Box textAlign="left" fontWeight="medium" mb={1}>
										{pratos.map((prato, i) => (
											<Box key={i}>{prato}</Box>
										))}
									</Box>
									<Box textAlign="right" fontWeight="medium">
										{status.map((st, i) => (
											<Box key={i}>{st}</Box>
										))}
									</Box>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
}
