import React, { useEffect } from 'react';
import { Button, Card, FormControl, Grid, Link, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import './index.css';
import { buscarUsuario, buscarUsuarioEmail, cadastrarUsuario } from '../../api/signup';
import { useNavigate } from 'react-router';

export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordTwo, setPasswordTwo] = React.useState("");
  const navigate = useNavigate();

  function delayAndGo() {
    setTimeout(() => navigate('/login'), 3000);
  }
  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  }

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const onPasswordChangeTwo = (e: any) => {
    setPasswordTwo(e.target.value);
  }

  const doRegister = async (e: any) => {
    const element: any = document.getElementById('error-message');
    e.preventDefault();

    if(username === ""  || username === null) {
      const returnMessage = element.innerHTML = "Erro, campos incompletos! tente novamente.";
      return returnMessage;
    }
    if(password === ""  || password === null) {
      const returnMessage = element.innerHTML = "Erro, campos incompletos! tente novamente.";
      return returnMessage;
    }
    if(email === ""  || email === null) {
      const returnMessage = element.innerHTML = "Erro, campos incompletos! tente novamente.";
      return returnMessage;
    }
    if(password != passwordTwo) {
      const returnMessage = element.innerHTML = "Erro, as senhas não coincidem! verifique novamente.";
      return returnMessage;
    }
    try {
      const resultsTwo = await buscarUsuario({"username": username})
      const resultsThree = await buscarUsuarioEmail({"email": email})
      const stringArray = JSON.stringify(resultsTwo);
      const stringArrayTwo = JSON.stringify(resultsThree);
      if(stringArray != '[]') {
        if(stringArrayTwo != '[]') {
          const returnMessage = element.innerHTML = "Erro, o nome de usuário e email já está sendo utilizado!";
          return returnMessage;
        } else {
          const returnMessage = element.innerHTML = "Erro, o nome de usuário já está sendo utilizado!";
          return returnMessage;
        }
      }
      if(stringArrayTwo != '[]') {
        if(stringArray != '[]') {
          const returnMessage = element.innerHTML = "Erro, o nome de usuário e email já está sendo utilizado!";
          return returnMessage;
        } else {
          const returnMessage = element.innerHTML = "Erro, o email já está sendo utilizado!";
          return returnMessage;
        }
      } else {
        await cadastrarUsuario({ "username": username, "password": password, "email": email })
        element.innerHTML = "Usuário cadastrado com sucesso! aguarde.";
        return delayAndGo();
      }
    } catch (err) {
      return err;
    }
  }

  return <>
      <Grid container direction="column" textAlign="center" justifyContent="center" bgcolor="white" width="30%" margin="auto" marginTop="2.5%" height="100%" minHeight="400px" borderRadius="2%" mx="auto">
      <Card sx={{ color: 'error.main', maxWidth: 400, maxHeght: 250 }}>
        <h4 id="error-message"></h4>
      </Card>
      <Card sx={{ maxWidth: 400 }}>
      <h1>Bem-Vindo!</h1>
      <Box justifyContent="center" alignItems="center">
        <FormControl onSubmit={doRegister}>
          <FormControl sx={{ m: 1, width: '25ch', bgcolor: '#E3E2E2', borderRadius: 1 }} variant="outlined">
            <TextField onChange={onUsernameChange} value={username} placeholder="Nome de usuário">
            </TextField>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch', bgcolor: '#E3E2E2', borderRadius: 1 }} variant="outlined">
            <TextField onChange={onEmailChange} value={email} placeholder="E-mail">
            </TextField>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch', bgcolor: '#E3E2E2', borderRadius: 1 }} variant="outlined">
            <TextField placeholder="password" onChange={onPasswordChange} value={password} type="password" >Digite sua senha</TextField>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch', bgcolor: '#E3E2E2', borderRadius: 1 }} variant="outlined">
            <TextField placeholder="password2" onChange={onPasswordChangeTwo} value={passwordTwo} type="password" >Digite novamente sua senha</TextField>
          </FormControl>
          <Link href="/login" underline="none" sx={{ mb: 5 }}>Você já tem uma conta? Clique aqui</Link>
          <Box textAlign="center" sx={{ mb: 3 }}>
            <Button variant="contained" color="primary" onClick={doRegister}>Registrar</Button>
          </Box>
        </FormControl>
      </Box>
      </Card>
      </Grid>
  </>
}