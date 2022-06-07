import React, { useState, useContext } from 'react';
import { Button, FormControl, InputLabel, Grid, Link, TextField, Card } from '@mui/material';
import { AuthContext } from '../../context/Auth';
import { criarCookie } from '../../context/cookie';
import { ERRO_TYPES, COOKIE_TYPES, LOGIN_TYPES } from '../../utils/types';
import Box, { BoxProps } from '@mui/material/Box';
import './index.css';
import { fazerLogin } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  }

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const history = useNavigate();

  const contexto: any = useContext(AuthContext);

  /* states */
  const [erro, setErro] = useState(() => {
    if (contexto.mensagemErro) {
      return contexto.mensagemErro
    }
  });
  const onSubmit = async (event: any) => {

    event.preventDefault();
    const element: any = document.getElementById('error-message');

    if(username === ""  || username === null) {
      const returnMessage = element.innerHTML = "Erro, campos incompletos! tente novamente.";
      return returnMessage;
    }
    if(password === ""  || password === null) {
      const returnMessage = element.innerHTML = "Erro, campos incompletos! tente novamente.";
      return returnMessage;
    }

    const login = await fazerLogin({ "username": username, "password": password });

  
    if (login.erro && login.erro.isAxiosError) {
      if (!login.erro.response) {
        /* caso o back-end caiu */
        return setErro(ERRO_TYPES.GENERICO.msg);
      } else if (login.erro.response.status === 401) {
        const returnMessage = element.innerHTML = "Erro, informações inválidas!";
        return returnMessage;
      } else if (login.erro.response.status === 400) {
        return setErro(ERRO_TYPES.JWT_NAO_AUTENTICADO.msg);
      } else {
        return setErro(ERRO_TYPES.GENERICO.msg);
      }
    }

    const token = login.data.access_token;

    element.innerHTML = "Dados enviados com sucesso! caso não ocorra nada, verifique seus dados.";
    
    criarCookie(COOKIE_TYPES.USUARIO, token);

    contexto.dispatch({ type: LOGIN_TYPES.OK, dados: { token } })

    localStorage.setItem('token', token);

    history("/home");

  }

  return <>
    <Grid container direction="column" textAlign="center" justifyContent="center" bgcolor="white" width="30%" margin="auto" marginTop="2.5%" height="100%" minHeight="400px" borderRadius="2%" mx="auto">
      <Box sx={{ color: 'error.main'}}>
        <h4 id="error-message"></h4>
      </Box>
      <h1>Bem-Vindo!</h1>
      <Box justifyContent="center" alignItems="center">
        <FormControl onSubmit={onSubmit}>
          <FormControl sx={{ m: 1, width: '25ch', bgcolor: '#E3E2E2', borderRadius: 1 }} variant="outlined">
            <TextField onChange={onUsernameChange} value={username} placeholder="Nome de usuário">
            </TextField>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch', bgcolor: '#E3E2E2', borderRadius: 1 }} variant="outlined">
            <TextField placeholder="password" onChange={onPasswordChange} value={password} type="password" >Senha</TextField>
          </FormControl>
          <Link href="/signup" underline="none" sx={{ mb: 5 }}>Não possui uma conta?</Link>
          <Box textAlign="center" sx={{ mb: 3 }}>
            <Button variant="contained" color="primary" onClick={onSubmit}> Login</Button>
          </Box>
        </FormControl>
      </Box>
    </Grid>
  </>
}