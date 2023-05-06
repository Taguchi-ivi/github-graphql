import Header from '../components/Header';
import { router } from './AppRoutes';
import { RouterProvider } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Provider } from "react-redux";
import store from "../store"

function App() {

  return (
    <>
      <Provider store={store}>
          <Header />
          <Container maxW="container.lg" mt={8}>
            <RouterProvider router={router} />
          </Container>
      </Provider>
    </>
  );
}

export default App;
