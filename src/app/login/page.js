"use client";
import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import { textFieldStyles } from "../styles";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de autenticação aqui, se necessário
        router.push('/tables');
    };

    return (

        <div className="flex h-screen w-full bg-[#411313]">
            <div className="w-[66%] bg-[#231013] relative">
                <div className="relative h-full w-full">
                    <Image
                        src="/icbuffet.png"
                        alt="ICBuffet"
                        fill
                    />
                    <div className="absolute bottom-0 bg-[#231013] bg-opacity-90 text-white p-4 w-full">
                        <h1 className="text-2xl font-bold flex items-center justify-center p-2">IC Buffet - Reserva de Restaurantes</h1>
                        <p className="text-lg flex justify-center items-center">O IC Buffet oferece uma experiência gastronômica única, permitindo reservas on-line de maneira rápida e prática.</p>
                        <p className="flex justify-center items-center">Contato: (81) 4002-8922 | contato@icbuffet.com</p>
                        <p className="text-xs flex justify-center items-center py-2">© 2024 IC Buffet. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
            <div className="w-[34%] relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <Image
                        src="/logo.png"
                        alt="ICBuffet"
                        width={200}
                        height={200}
                    />
                </div>
                <div className="flex flex-grow h-full items-center justify-center">
                    <div className="w-[80%]">
                        <div className="text-2xl text-white font-bold">
                            LOGIN
                        </div>
                        <div className="text-sm text-[#bebec2] py-2">
                            Entre na sua conta para fazer a reserva!
                        </div>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                className="rounded"
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
                                className="rounded"
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
                                        bgcolor: "#D58A1E"
                                    }
                                }}
                                className="bg-[#bc8c4e] hover:bg-[#D58A1E] font-bold"
                            >
                                Entrar
                            </Button>
                        </Box>
                        <div className="flex p-4 justify-center">
                            <div className="px-2 text-[#C5C5C5]">
                                Ainda não possui conta?
                            </div>
                            <Link
                                href="/register"
                                underline="hover"
                                sx={{
                                    cursor: 'pointer'
                                }}
                                className="text-white underline font-bold flex justify-center "
                            >
                                Registrar-se
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}