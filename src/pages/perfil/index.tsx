import { Box, Button, Card, Grid, TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';
import React from 'react';
import Footer from '../../components/footer/index';
import NavBar from '../../components/navbar/index';
import Typography from '@mui/material/Typography';
import { mudarUsuario } from '../../api/perfil';
import { useNavigate } from 'react-router';
export default function Perfil() {
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const getToken: any = localStorage.getItem('token');
    const token: any = jwtDecode(getToken);

    const onChangeUsername = (e: any) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const history = useNavigate();

    const mudarPerfil = async (e: any) => {
        const element: any = document.getElementById('message');
        if(name === null) {
            const returnMessage = element.innerHTML = "Dados enviados com sucesso!";
            return await mudarUsuario(token._id, {"email": email}) && returnMessage && history('/logout');
        } else if(email === null) {
            const returnMessage = element.innerHTML = "Dados enviados com sucesso!";
            return await mudarUsuario(token._id, {"username": name}) && returnMessage && history('/logout');
        } else if (name === null && email === null) {
            const returnMessage = element.innerHTML = "Erro, campos não preenchidos!";
            return returnMessage;
        } else {
            const returnMessage = element.innerHTML = "Dados enviados com sucesso!";
            return await mudarUsuario(token._id, {"username": name}) && returnMessage && history('/logout');
        }
    }
    return <>
        <NavBar />
        <Box sx={{ m: 0, p: 0, width: "100%", height: "100%", bgcolor: "#ffffff" }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={7} md={4}>
                    <Card sx={{ maxWidth: 600, maxHeght: 600 }}>
                        <Typography align='center'>
                            <h2>Perfil</h2>
                            <TextField
                                required
                                id="outlined-required"
                                onChange={onChangeUsername}
                                label="Username"
                                defaultValue={token.username}
                                sx={{ m: 2 }}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                onChange={onChangeEmail}
                                label="E-mail"
                                defaultValue={token.email}
                                sx={{ m: 2 }}
                            />
                            <h4 id="message"></h4>
                            <Button onClick={mudarPerfil}>Salvar alterações</Button>
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Box>
        <Footer />
    </>
}