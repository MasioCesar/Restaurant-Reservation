"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Header } from "@/components/header";
import {
  Box, Container, TextField, Button, Typography, Grid, Card, CardMedia, CardActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, FormControl, InputLabel, Snackbar,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUser } from "../context/UserContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RestaurantForm() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [restaurantData, setRestaurantData] = useState({
    nome: "",
    descricao: "",
    cardapio: [],
    abre: "",
    fecha: "",
    mesas: "",
    endereco: "",
    imagem: null,
  });

  const [prato, setPrato] = useState({
    nome: "",
    descricao: "",
    preco: "R$ ",
    tipo: "Principal",
    imagem: null,
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        router.push('/restaurants');
      }, 1500);
      return () => clearTimeout(timer);
    }
    setUser(user);
  }, [redirecting, router, setUser, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRestaurantData((prevData) => ({
      ...prevData,
      imagem: file,
    }));
  };

  const handlePratoChange = (e) => {
    const { name, value } = e.target;
    setPrato((prevPrato) => ({
      ...prevPrato,
      [name]: value,
    }));
  };

  const handleAddPrato = () => {
    // Verificar se o nome e a descrição são obrigatórios
    if (!prato.nome.trim()) {
      setSnackbarMessage("O prato deve ter um nome.");
      setOpenSnackbar(true);
      return;
    }

    if (!prato.descricao.trim()) {
      setSnackbarMessage("O prato deve ter uma descrição.");
      setOpenSnackbar(true);
      return;
    }
    
    const precoNumerico = parseFloat(prato.preco.replace("R$", "").replace(",", ".").trim());
    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      setSnackbarMessage("O prato deve ter um preço válido maior que zero. (Ex: R$ 10,00)");
      setOpenSnackbar(true);
      return;
    }

    if (editingIndex !== null) {
      const updatedCardapio = restaurantData.cardapio.map((item, index) =>
        index === editingIndex ? prato : item
      );
      setRestaurantData((prevData) => ({
        ...prevData,
        cardapio: updatedCardapio,
      }));
      setEditingIndex(null);
    } else {
      setRestaurantData((prevData) => ({
        ...prevData,
        cardapio: [...prevData.cardapio, prato],
      }));
    }
    setPrato({ nome: "", descricao: "", preco: "R$ ", tipo: "Principal", imagem: null });
  };

  const handleEditPrato = (index) => {
    setEditingIndex(index);
    setPrato(restaurantData.cardapio[index]);
  };

  const handleRemovePrato = (index) => {
    setRestaurantData((prevData) => ({
      ...prevData,
      cardapio: prevData.cardapio.filter((_, i) => i !== index),
    }));
  };

  const handlePratoFileChange = (e) => {
    const file = e.target.files[0];
    setPrato((prevPrato) => ({
      ...prevPrato,
      imagem: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se há pelo menos um prato no cardápio
    if (restaurantData.cardapio.length === 0) {
      setSnackbarMessage("O cardápio deve ter pelo menos um prato.");
      setOpenSnackbar(true);
      return;
    }

    // Função para verificar se os minutos são válidos
    const isValidMinutes = (time) => {
      const minutes = parseInt(time.split(':')[1], 10);
      return [0, 15, 30, 45].includes(minutes);
    };

    // Função para verificar se o intervalo de tempo é de pelo menos 3 horas
    const isValidTimeInterval = (start, end) => {
      const [startHours, startMinutes] = start.split(':').map(Number);
      const [endHours, endMinutes] = end.split(':').map(Number);
      const startTime = new Date(0, 0, 0, startHours, startMinutes);
      const endTime = new Date(0, 0, 0, endHours, endMinutes);
      const diff = (endTime - startTime) / (1000 * 60 * 60); // Diferença em horas
      return diff >= 3;
    };

    const { abre, fecha } = restaurantData;

    if (!isValidMinutes(abre) || !isValidMinutes(fecha)) {
      setSnackbarMessage("Os minutos devem ser 00, 15, 30 ou 45.");
      setOpenSnackbar(true);
      return;
    }

    if (!isValidTimeInterval(abre, fecha)) {
      setSnackbarMessage("O intervalo entre a hora de abertura e fechamento deve ser de pelo menos 3 horas.");
      setOpenSnackbar(true);
      return;
    }

    console.log("Dados do restaurante:", restaurantData);

    const formData = new FormData();
    formData.append("imagemRestaurante", restaurantData.imagem);

    restaurantData.cardapio.forEach((prato, index) => {
      formData.append(`dish-image-${index}-${prato.nome}`, prato.imagem);
    });

    const mesas = Array.from({ length: restaurantData.mesas }, (_, index) => (
      { number: index + 1, reservations: [{}] }
    ));

    const data = {
      nome: restaurantData.nome,
      descricao: restaurantData.descricao,
      cardapio: restaurantData.cardapio,
      abre: restaurantData.abre,
      fecha: restaurantData.fecha,
      mesas: mesas,
      endereco: restaurantData.endereco,
      imagem: null,
    };

    formData.append('data', JSON.stringify(data));

    try {
      const response = await fetch("api/restaurant", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSnackbarMessage("Cadastro enviado com sucesso!");
        setOpenSnackbar(true);
        setRedirecting(true);
      } else {
        setSnackbarMessage("Erro ao cadastrar restaurante. Tente novamente.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setSnackbarMessage("Erro ao cadastrar restaurante. Tente novamente.");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h4" mb={2}>
            Cadastro de Restaurante
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome do Restaurante"
                  name="nome"
                  value={restaurantData.nome}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descrição"
                  name="descricao"
                  value={restaurantData.descricao}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Horário de Abertura"
                  name="abre"
                  value={restaurantData.abre}
                  onChange={handleChange}
                  required
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Horário de Fechamento"
                  name="fecha"
                  value={restaurantData.fecha}
                  onChange={handleChange}
                  required
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número de Mesas"
                  name="mesas"
                  value={restaurantData.mesas}
                  onChange={handleChange}
                  required
                  type="number"
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Localização"
                  name="endereco"
                  value={restaurantData.endereco}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', padding: '16px' }}>
                  <Grid item xs={12} >
                    <Typography variant="h6" mb={2}>
                      Cardápio
                    </Typography>
                    <TableContainer>
                      <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                        {restaurantData.cardapio.length > 0 && (
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ width: '10%' }}>Nome</TableCell>
                              <TableCell sx={{ width: '20%' }}>Descrição</TableCell>
                              <TableCell sx={{ width: '10%' }}>Preço</TableCell>
                              <TableCell sx={{ width: '10%' }}>Tipo</TableCell>
                              <TableCell sx={{ width: '20%' }}>Imagem</TableCell>
                              <TableCell >Ações</TableCell>
                            </TableRow>
                          </TableHead>
                        )}

                        <TableBody>
                          {restaurantData.cardapio.map((prato, index) => (
                            <TableRow key={index}>
                              <TableCell data-label="Nome" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {prato.nome}
                              </TableCell>
                              <TableCell data-label="Descrição" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {prato.descricao}
                              </TableCell>
                              <TableCell data-label="Preço" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {prato.preco}
                              </TableCell>
                              <TableCell data-label="Tipo" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {prato.tipo}
                              </TableCell>
                              <TableCell data-label="Imagem" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {prato.imagem ? prato.imagem.name : "Sem imagem"}
                              </TableCell>
                              <TableCell>
                                <Box display="flex" gap={1}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleEditPrato(index)}
                                    sx={{ flexGrow: 1 }}
                                  >
                                    Editar
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleRemovePrato(index)}
                                    sx={{ flexGrow: 1 }}
                                  >
                                    Remover
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" mb={2}>
                      {editingIndex !== null ? "Editar Prato" : "Adicionar Prato"}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nome"
                          name="nome"
                          value={prato.nome}
                          onChange={handlePratoChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Descrição"
                          name="descricao"
                          value={prato.descricao}
                          onChange={handlePratoChange}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Preço (R$ 0,00)"
                          name="preco"
                          value={prato.preco}
                          onChange={handlePratoChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel shrink>Tipo</InputLabel>
                          <Select
                            name="tipo"
                            value={prato.tipo}
                            onChange={handlePratoChange}
                            label="Tipo"
                          >
                            <MenuItem value="Entrada">Entrada</MenuItem>
                            <MenuItem value="Principal">Principal</MenuItem>
                            <MenuItem value="Bebida">Bebida</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} container justifyContent="center">
                        <Grid item xs={12} sm={12} md={6}>
                          <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            startIcon={<Box component="span" sx={{ fontWeight: 'bold' }}>+</Box>}
                          >
                            Upload Imagem do Prato
                            <input
                              type="file"
                              hidden
                              onChange={handlePratoFileChange}
                              accept="image/*"
                            />
                          </Button>
                        </Grid>
                      </Grid>

                      {prato.imagem && (
                        <Grid item xs={12} textAlign={"center"}>
                          <Typography variant="body2" mt={1}>
                            Imagem selecionada: {prato.imagem.name}
                          </Typography>
                        </Grid>
                      )}

                      <Grid item xs={12} container justifyContent="center">
                        <Grid item xs={12} sm={12} md={6}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddPrato}
                            fullWidth
                          >
                            {editingIndex !== null ? "Salvar Alterações" : "Adicionar Prato"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<Box component="span" sx={{ fontWeight: 'bold' }}>+</Box>}
                >
                  Upload Foto do Restaurante
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
              </Grid>
              {restaurantData.imagem && (
                <Grid item xs={12}>
                  <CardMedia
                    component="img"
                    sx={{
                      maxHeight: '100px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      mt: 2,
                      borderRadius: 1,
                    }}
                    image={URL.createObjectURL(restaurantData.imagem)}
                    alt="Pré-visualização da imagem"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Finalizar Cadastro de Restaurante
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
