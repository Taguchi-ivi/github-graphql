
import React from 'react';
// import { Link, useRouteError} from 'react-router-dom';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    // const error = useRouteError();
    // console.error(error);

    return (
        <div>
            <h1>Error!</h1>
            <p>
                <Link to="/">Go back to home.</Link>
            </p>
        </div>
    )
}

export default ErrorPage