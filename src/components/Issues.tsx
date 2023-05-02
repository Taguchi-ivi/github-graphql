import React from 'react';
import {gql, useQuery} from '@apollo/client';
import { useParams } from 'react-router-dom';

// type Repository = {
//     name: string;
//     url: string;
//     description: string;
// }

const GET_ISSUES = gql`
    query GetIssues {
        repository(owner: "facebook", name: "react") {
            issues(first: 100) {
                edges {
                    node {
                        title
                    }
                }
            }
        }
    }`;

const Issues: React.FC = () => {
    const params = useParams();
    const id = params.id
    // const { loading, error, data } = useQuery(GET_ISSUES);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :{error.message}</p>;
    // const {issueCount, nodes: issues} = data.search;
    return (
        <>
            {!id && (<h3>正しいURLを指定してください</h3>)}
            {id && (<h3>これはid:{id}のページです</h3>)}
        </>
    )
}

export default Issues