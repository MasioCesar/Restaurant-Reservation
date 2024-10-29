"use client";
import { useState } from "react";
import { Grid, Box, Typography, TextField, Button, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from "@mui/material";
import Image from "next/image";
import { textFieldStyles } from "../styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function Register() {
    const router = useRouter();
    const { setUser } = useUser();
    const [access, setAccess] = useState();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!access) {
            alert("Por favor, selecione Cliente ou Dono.");
            return;
        }

        const formData = new FormData(e.target);
        const userData = { // Dados do usuário
            nome: formData.get('nome'),
            email: formData.get('email'),
            password: formData.get('password'),
            access: access
        };

        setUser(userData);

        router.push('/restaurants');
    };

    return (
        <Grid container className="min-h-screen bg-[#411313]">
            {/* Esquerda */}
            <Grid
                item
                xs={0}
                md={8}
                className="relative bg-[#231013]"
                display={{ xs: "none", md: "block" }}
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
                    <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom fontSize={24}>
                        IC Buffet - Reserva de Restaurantes
                    </Typography>
                    <Typography variant="body1" gutterBottom fontSize={16}>
                        O IC Buffet oferece uma experiência gastronômica única, permitindo
                        reservas on-line de maneira rápida e prática.
                    </Typography>
                    <Typography variant="body2" >
                        Contato: (81) 4002-8922 | contato@icbuffet.com
                    </Typography>
                    <Typography variant="caption" display="block" mt={2} >
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
                <Box width="90%" maxWidth={400}>
                    <Box className="flex justify-center items-center mb-2">
                        <Image src="/logo.png" alt="ICBuffet Logo" width={150} height={150} />
                    </Box>
                    <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                        REGISTRAR-SE
                    </Typography>
                    <Typography variant="body2" color="#bebec2" gutterBottom>
                        Crie sua conta para fazer a reserva!
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRegister}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            autoComplete="nome"
                            InputLabelProps={{ className: "text-white" }}
                            sx={textFieldStyles}
                        />
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

                        <FormControl component="fieldset" sx={{ marginTop: 1, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <FormLabel component="legend" >Tipo de conta</FormLabel>
                            <RadioGroup
                                aria-label="access"
                                name="access"
                                value={access}
                                onChange={(e) => setAccess(e.target.value)}
                                row
                                sx={{ justifyContent: 'center' }}
                            >
                                <FormControlLabel value="client" control={<Radio />} label="Cliente" />
                                <FormControlLabel value="owner" control={<Radio />} label="Dono" />
                            </RadioGroup>
                        </FormControl>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                padding: 1.5,
                                mt: 3,
                                bgcolor: "#bc8c4e",
                                "&:hover": {
                                    bgcolor: "#D58A1E",
                                },
                            }}
                            className="bg-[#bc8c4e] hover:bg-[#D58A1E] font-bold"
                        >
                            Criar Conta
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="center" p={2}>
                        <Typography variant="body2" color="#C5C5C5" mr={1}>
                            Já possui uma conta?
                        </Typography>
                        <Link href="/login" passHref>
                            <Typography
                                color="white"
                                className="underline font-bold cursor-pointer"
                            >
                                Fazer login
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
