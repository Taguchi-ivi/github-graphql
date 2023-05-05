import { gql } from '@apollo/client';

export const GET_ISSUES = gql`
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
                            url
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