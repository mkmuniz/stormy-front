import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

export default function Footer() {
    return <>
        <BottomNavigation sx={{ textAlign: 'center', color: "#F5F5F5", bgcolor: '#D100F3' }}>
            <Grid container sx={{ bgcolor: '#D100F3' }} >
                <Grid item xs={4}>
                    <List sx={{ width: '100%', height: '100%' }}>
                        <h4>Apresentação</h4>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <VideogameAssetIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Site especializado em avaliações e pesquisa de jogos." />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Grupo de alunos da Mackenzie." />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List sx={{ width: '100%', height: "100%" }}>
                        <h4>Parceria</h4>
                        <ListItem>
                            <img src="https://www.dhla.org/wp-content/uploads/2021/11/logo-mackenzie-png-2.png" style={{ width: "75%" }} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List sx={{ width: '100%', height: "100%" }}>
                        <h4>Contato</h4>
                        <ListItem>
                            stormyweboficial@gmail.com
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </BottomNavigation>
    </>
}