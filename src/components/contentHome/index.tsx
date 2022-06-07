import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, styled } from '@mui/material';
import { Typography, TextField } from '@mui/material';
import { get } from '../../api/request';
import { buscarJogos } from '../../api/games';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeContent() {
    const [dataGames, setData] = React.useState([]);
    const imagemStyle: any = {
        width: "100%",
        height: "75vh"
    }
    const history: any = useNavigate();

    const Item = styled(Paper)(({ theme }: any) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const getGames = async () => {
        const games = await buscarJogos()
        setData(games.data);
    };
    useEffect(() => {
        getGames()
    }, [])

    const [titulo, setTitulo] = useState('');

    // the search result
    const [foundGames, setFoundGames] = useState(dataGames);

    const filter = (e: any) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = dataGames.filter((game: any) => {
                return game.titulo.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundGames(results);
        } else {
            setFoundGames(dataGames);
            // If the text field is empty, show all users
        }

        setTitulo(keyword);
    };
    return <>
        <Box sx={{ m: 0, p: 0, width: "100%", height: "50%", bgcolor: '#000000' }}>
            <img style={imagemStyle} src="https://images4.alphacoders.com/100/thumb-1920-1005943.png" />
        </Box>
        <Box sx={{ m: 0, p: 0, width: "100%", height: "100%", bgcolor: "#ffffff" }}>
            <Card sx={{ bgcolor: "#ffffff" }}>
                <Typography textAlign="center">
                    <TextField fullWidth label="Pesquisar"
                        type="search"
                        value={titulo}
                        onChange={filter}
                        placeholder="Digite um nome de jogo"
                        sx={{ width: "50%", mt: 2, mb: 6 }}
                    />
                    <div className="user-list">
                        <Grid container justifyContent="center" spacing={{ mt: 5, xs: 5, md: 3, mx: 'auto' }} columns={{ ml: 2, xs: 4, m: 4, sm: 8, md: 12 }}>
                            {foundGames && foundGames.length > 0 ? (
                                foundGames.map((game: any) => (
                                        <Item>
                                            <Card sx={{ maxWidth: 345, maxHeight: 300, mt: 3 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={game.imagem}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {game.titulo}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {game.descricao}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                            <a style={{ textDecoration: "none", color: "black"}} href={'/game/' + game._id}>Mais informações, clique aqui!</a>
                                        </Item>
                                ))
                            ) : (
                                <h1>Nada encontrado, pesquise por um item.</h1>
                            )}
                        </Grid>
                    </div>
                </Typography>
            </Card>
        </Box>
    </>
}