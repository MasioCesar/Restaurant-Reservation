"use client";
import { useRef, useState } from "react";
import { Grid, Box, Typography, TextField, Button, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from "@mui/material";
import Image from "next/image";
import { textFieldStyles } from "../styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setRegisterUser } from "@/lib/setFirebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default function Register() {
    const form = useRef();
    const router = useRouter();
    const [access, setAccess] = useState();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            userName: '',
            password: '',
            owner: false,
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            userName: Yup
                .string()
                .max(255)
                .required('UserName is required'),
            password: Yup
                .string()
                .max(255)
                .min(6, "Senha muito fraca")
                .required('Password is required'),
            owner: Yup
                .boolean(),
        }),
        onSubmit: () => {
            console.log("ENTROU")
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
                .then(async () => {
                    await setRegisterUser(formik.values)

                    if (formik.values.owner == true) {
                        alert("Quer ser dono")
                        /*emailjs.sendForm('service_1t2y2qd', 'template_i9ynk3d', form.current, 'o3FH4JUttrmR411Z4')
                            .then((result) => {
                                console.log(result.text);
                            }, (error) => {
                                console.log(error.text);
                            });
                        */
                    }

                    router
                        .push('/login')
                        .catch(console.error);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode == 'auth/email-already-in-use') {
                        document.querySelector("#error-message").innerHTML = "Email já está em uso";
                    } if (errorCode == 'auth/invalid-email') {
                        document.querySelector("#error-message").innerHTML = "Email inválido";
                    }
                });
        }
    });

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
                    fill
                    style={{ objectFit: 'cover' }} // Usar style diretamente para controlar o objectFit
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
                        <Image src="/logo.png" alt="ICBuffet Logo" width={150} height={150} priority />
                    </Box>
                    <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                        REGISTRAR-SE
                    </Typography>
                    <Typography variant="body2" color="#bebec2" gutterBottom>
                        Crie sua conta para fazer a reserva!
                    </Typography>
                    <form ref={form} onSubmit={formik.handleSubmit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                error={Boolean(formik.touched.userName && formik.errors.userName)}
                                helperText={formik.touched.userName && formik.errors.userName}
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="Name"
                                name="userName"
                                autoComplete="name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.userName}
                                InputLabelProps={{ className: "text-white" }}
                                sx={textFieldStyles}
                            />
                            <TextField
                                error={Boolean(formik.touched.email && formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                InputLabelProps={{ className: "text-white" }}
                                sx={textFieldStyles}
                            />
                            <TextField
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                                id="password"
                                autoComplete="current-password"
                                InputLabelProps={{ className: "text-white" }}
                                sx={textFieldStyles}
                            />

                            <FormControl
                                component="fieldset"
                                sx={{ marginTop: 1, display: "flex", alignItems: "center", flexDirection: "column" }}
                            >
                                <FormLabel component="legend">Tipo de conta</FormLabel>
                                <RadioGroup
                                    aria-label="access"
                                    name="access"
                                    value={access}
                                    onChange={(e) => {
                                        setAccess(e.target.value);
                                        formik.setFieldValue("owner", e.target.value === "owner");
                                    }}
                                    row
                                    sx={{ justifyContent: "center" }}
                                >
                                    <FormControlLabel value="client" control={<Radio />} label="Cliente" />
                                    <FormControlLabel value="owner" control={<Radio />} label="Dono" />
                                </RadioGroup>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                disabled={isSubmitting}
                                variant="contained"
                                sx={{
                                    padding: 1.5,
                                    mt: 3,
                                    bgcolor: "#bc8c4e",
                                    "&:hover": { bgcolor: "#D58A1E" },
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
                                <Typography color="white" className="underline font-bold cursor-pointer">
                                    Fazer login
                                </Typography>
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}
