import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Container, Grid, } from '@mui/material'

import './App.css';
import MainHeader from './views/Main/MainHeader/intex';
import MainMenus from './views/Main/MainMenus';
import AuthenticationView from './views/AuthenticationView';
import BoardWriteView from './views/Board/BoardWriteView';


function App() {

  return (
    <>
    <Container fixed>
        <MainHeader />
          {/* <AuthenticationView /> */}
        {/* <Grid container>
          <Grid item xs={2.5} >
              <MainMenus />
              
          </Grid>
        </Grid>  */}
        <BoardWriteView />
    </Container>
    </>
  );
}

export default App;
