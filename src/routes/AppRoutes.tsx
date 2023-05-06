import Home from '../page/Home';
import Issues from '../page/Issues';
import ErrorPage from '../page/ErrorPage';
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