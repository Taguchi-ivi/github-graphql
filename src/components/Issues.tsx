import react from 'react';
import {gql, useQuery} from '@apollo/client';

type Repository = {
    name: string;
    url: string;
    description: string;
}

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

const Issues = () => {
    const { loading, error, data } = useQuery(GET_ISSUES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{error.message}</p>;
    const {issueCount, nodes: issues} = data.search;
    return (
        <>
            <h2>Num of issues: {issueCount}</h2>
            <ul>
                { issues.map((issue: Repository) => (
                    <li key={issue.name}>{issue.name}</li>
                ))}
                {/* {issues.join('\n')} */}
            </ul>
        </>
    )
}

export default Issues