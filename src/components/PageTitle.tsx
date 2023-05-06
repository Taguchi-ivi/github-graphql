import React from 'react';
import { Helmet } from "react-helmet-async";

type Props = {
    pageName: string
}

const PageTitle: React.FC<Props> = ({ pageName }) => {
    return (
        <Helmet>
            <title>{pageName}</title>
        </Helmet>
    )
}

export default PageTitle