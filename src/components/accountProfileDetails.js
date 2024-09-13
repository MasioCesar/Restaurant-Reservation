import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from '@mui/material';

export const AccountProfileDetails = () => {

    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card className='bg-[#411313]'>
                <CardHeader className='text-white'
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={2.5}
                    >
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Nome completo"
                                name="userName"
                                InputLabelProps={{
                                    sx: {
                                        color: 'white',
                                        '&.Mui-focused': {
                                            color: 'white',
                                        },
                                    },
                                }}
                                InputProps={{
                                    sx: {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        color: 'white'
                                    },
                                }}
                            />

                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                name="email"
                                defaultValue="ranilson@ic.ufal.br"
                                InputProps={{
                                    sx: {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        color: 'white'
                                    },
                                }}
                                
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Número do telefone"
                                name="phone"
                                type="number"
                                InputLabelProps={{
                                    sx: {
                                        color: 'white',
                                        '&.Mui-focused': {
                                            color: 'white',
                                        },
                                    },
                                }}
                                InputProps={{
                                    sx: {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        color: 'white'
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        type="submit"
                        className='bg-[#FFD700] text-white'
                        variant="contained"
                        sx={{ textTransform: 'none' }}
                    >
                        Salvar dados
                    </Button>
                </Box>
            </Card>
        </form>
    );
};