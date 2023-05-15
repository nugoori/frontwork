import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Container, Grid, } from '@mui/material'

import './App.css';
import MainHeader from './views/Main/MainHeader/intex';
import MainMenus from './views/Main/MainMenus';
import AuthenticationView from './views/AuthenticationView';
import BoardWriteView from './views/Board/BoardWriteView';
import Main from './views/Main';
import ProductWriteView from './views/Product/ProductWriteView';


function App() {

  const path = useLocation();

  return (
    <>
      <Container fixed />
      <Routes>
        <Route path='/' element={( <Main />)} />
        <Route path='/auth' element={( <AuthenticationView/> )} />
        <Route path='/board'>
          <Route path='post-board' element={( <BoardWriteView /> )} />
        </Route>
        <Route path='/product'>
          <Route path='post-product' element={( <ProductWriteView /> )} />
        </Route>
      </Routes>

    
    </>
  );
}

export default App;
