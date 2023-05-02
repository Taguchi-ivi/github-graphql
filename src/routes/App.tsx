// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from '../components/Header';
import { router } from './AppRoutes';
// import { ChakraProvider } from '@chakra-ui/react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
      // <ChakraProvider>
    <>
        <Header />
        <RouterProvider router={router} />
    </>
      // </ChakraProvider>
  );
}

export default App;
