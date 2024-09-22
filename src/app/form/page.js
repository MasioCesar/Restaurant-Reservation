"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Header } from "@/components/header";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
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
    previewImagem: null,
    prato: { nome: "", descricao: "", preco: "", tipo: "Principal", imagem: null },
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
      previewImagem: URL.createObjectURL(file),
    }));
  };

  const handlePratoChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      prato: {
        ...prevData.prato,
        [name]: value,
      },
    }));
  };

  const handleAddPrato = () => {
    if (editingIndex !== null) {
      const updatedCardapio = restaurantData.cardapio.map((prato, index) =>
        index === editingIndex ? restaurantData.prato : prato
      );
      setRestaurantData((prevData) => ({
        ...prevData,
        cardapio: updatedCardapio,
        prato: { nome: "", descricao: "", preco: "", tipo: "Principal" },
      }));
      setEditingIndex(null);
    } else {
      setRestaurantData((prevData) => ({
        ...prevData,
        cardapio: [...prevData.cardapio, prevData.prato],
        prato: { nome: "", descricao: "", preco: "", tipo: "Principal" },
      }));
    }
  };

  const handleEditPrato = (index) => {
    setEditingIndex(index);
    setRestaurantData((prevData) => ({
      ...prevData,
      prato: prevData.cardapio[index],
    }));
  };

  const handleRemovePrato = (index) => {
    setRestaurantData((prevData) => ({
      ...prevData,
      cardapio: prevData.cardapio.filter((_, i) => i !== index),
    }));
  };

  const handlePratoFileChange = (e) => {
    const file = e.target.files[0];
    setRestaurantData((prevData) => ({
      ...prevData,
      prato: {
        ...prevData.prato,
        imagem: file
      }
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do restaurante:", restaurantData);
    setSnackbarMessage("Cadastro enviado com sucesso!");
    setOpenSnackbar(true);
    setRedirecting(true);
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
                  name="nome"
                  value={restaurantData.localizacao}
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
                        value={restaurantData.prato.nome}
                        onChange={handlePratoChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Descrição"
                        name="descricao"
                        value={restaurantData.prato.descricao}
                        onChange={handlePratoChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Preço"
                        name="preco"
                        value={restaurantData.prato.preco}
                        onChange={handlePratoChange}
                        placeholder="R$ 0,00"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel shrink>Tipo</InputLabel>
                        <Select
                          name="tipo"
                          value={restaurantData.prato.tipo}
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

                    {restaurantData.prato.imagem && (
                      <Grid item xs={12} textAlign={"center"}>
                        <Typography variant="body2" mt={1}>
                          Imagem selecionada: {restaurantData.prato.imagem.name}
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
              {restaurantData.previewImagem && (
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
                    image={restaurantData.previewImagem}
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
