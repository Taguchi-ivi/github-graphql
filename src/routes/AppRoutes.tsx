import Home from '../components/Home';
import ErrorPage from '../components/Atoms/ErrorPage';
import Issues from '../components/Issues';
// import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/issues", element: <Issues />,
        children: [{
            path: ":id", element: <Issues />
        }]
    },
    { path: "*", element: <ErrorPage /> },
])