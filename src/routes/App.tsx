// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from '../components/Header';
import { router } from './AppRoutes';
import { RouterProvider } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

function App() {

  return (
    <>
      <Header />
      <Container maxW="container.lg" mt={8}>
        <RouterProvider router={router} />
      </Container>
    </>
  );
}

export default App;
