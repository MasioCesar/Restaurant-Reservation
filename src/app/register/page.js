import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import { textFieldStyles } from "../styles";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex h-screen w-full bg-[#411313]">
            <div className="w-[66%] bg-[#231013] relative">
                <Image
                    src="/icbuffet.png"
                    alt="ICBuffet"
                    fill
                />
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
                            REGISTRAR-SE
                        </div>
                        <div className="text-sm text-[#bebec2] py-2">
                            Crie sua conta para fazer a reserva!
                        </div>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nome"
                                label="Nome"
                                name="nome"
                                autoComplete="nome"
                                className="rounded"
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
                                Criar Conta
                            </Button>
                        </Box>
                        <Link
                            href="/login"
                            underline="hover"
                            sx={{
                                cursor: 'pointer'
                            }}
                            className="text-[#C5C5C5] flex justify-center p-4 underline" style={{ textDecorationColor: '#ffffff' }}
                        >
                            Já possuo uma conta!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}