import Home from '../components/Home';
import Issues from '../components/Issues';
import ErrorPage from '../components/ErrorPage';
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