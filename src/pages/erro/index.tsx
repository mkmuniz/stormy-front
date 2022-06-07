import React from 'react';
import { Grid } from "@mui/material";
import { Navigate } from 'react-router-dom';

export default function ErroPage() {
    return<>
        <Grid container direction="column" textAlign="center" justifyContent="center" bgcolor="#F1F1F1" width="70%" margin="auto" marginTop="5%" height="100%" minHeight="500px" borderRadius="2%" mx="auto">
            <h1>ERRO!</h1>
            <h2>Page not found!</h2>
            <Navigate to="/login" />
        </Grid>
    </>
}