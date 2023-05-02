import React from 'react';
import {gql, useQuery} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

// type Repository = {
//     name: string;
//     url: string;
//     description: string;
// }

const GET_ISSUES = gql`
    query GetIssues($repositoryId: ID!) {
        node(id: $repositoryId) {
            ... on Repository {
                name,
                owner {
                    login
                }
                issues(first: 10, after: null, orderBy: { field: CREATED_AT, direction: DESC }) {
                    edges {
                        node {
                            id
                            title
                            createdAt
                            url
                            state
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    }
`;

const Issues: React.FC = () => {
    const componentName = "Issues Search"
    const params = useParams();
    const id = params.id
    const { loading, error, data } = useQuery(GET_ISSUES, {
        variables: {
            repositoryId: id
        }
    });

    const PageBack = () => {
        window.history.back()
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{error.message}</p>;

    return (
        <>
            <Helmet>
                <title>{componentName}</title>
            </Helmet>
            {!id && (<h3>正しいURLを指定してください</h3>)}
            {data && (
                <div>
                    <button onClick={PageBack}>←back to search</button>
                    <span>Latest issues</span>
                    <span>on {data.node.owner.login}/{data.node.name}</span>
                    <ul>
                        {data.node.issues.edges.map(( edge: any, index: number ) => (
                            <li key={index}>
                                <a href={edge.node.url} target="_blank" rel="noopener noreferrer">{edge.node.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Issues