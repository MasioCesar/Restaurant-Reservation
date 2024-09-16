"use client";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { textFieldStyles } from "../styles";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de autenticação aqui
        router.push("/tables");
    };

    return (
        <Grid container className="min-h-screen bg-[#411313]">
            {/* Esquerda */}
            <Grid
                item
                xs={0}
                md={8}
                className="relative bg-[#231013]"
                display={{ xs: 'none', md: 'block' }}
            >
                <Image
                    src="/icbuffet.png"
                    alt="ICBuffet"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <Box
                    className="absolute bottom-0 w-full p-4 text-white bg-opacity-90 bg-[#231013]"
                    textAlign="center"
                >
                    <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                        IC Buffet - Reserva de Restaurantes
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        O IC Buffet oferece uma experiência gastronômica única, permitindo
                        reservas on-line de maneira rápida e prática.
                    </Typography>
                    <Typography variant="body2">
                        Contato: (81) 4002-8922 | contato@icbuffet.com
                    </Typography>
                    <Typography variant="caption" display="block" mt={2}>
                        © 2024 IC Buffet. Todos os direitos reservados.
                    </Typography>
                </Box>
            </Grid>

            {/* Direita */}
            <Grid
                item
                xs={12}
                md={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
            >
                <Box width="80%">
                    <Box className="flex justify-center items-center">
                        <Image src="/logo.png" alt="ICBuffet Logo" width={200} height={200} />
                    </Box>
                    <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                        LOGIN
                    </Typography>
                    <Typography variant="body2" color="#bebec2" gutterBottom>
                        Entre na sua conta para fazer a reserva!
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            InputLabelProps={{ className: "text-white" }}
                            sx={textFieldStyles}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            InputLabelProps={{ className: "text-white" }}
                            sx={textFieldStyles}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                padding: 2,
                                mt: 4,
                                bgcolor: "#bc8c4e",
                                "&:hover": {
                                    bgcolor: "#D58A1E",
                                },
                            }}
                            className="bg-[#bc8c4e] hover:bg-[#D58A1E] font-bold"
                        >
                            Entrar
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="center" p={4}>
                        <Typography variant="body2" color="#C5C5C5" mr={1}>
                            Ainda não possui conta?
                        </Typography>
                        <Link href="/register" passHref>
                            <Typography
                                color="white"
                                className="underline font-bold cursor-pointer"
                            >
                                Registrar-se
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
