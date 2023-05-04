import { gql } from '@apollo/client';

export const RepositorySearchQuery = gql`
    query SearchRepository($after: String, $query: String!) {
        search(first: 10, after: $after, query: $query, type: REPOSITORY) {
            repositoryCount
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    ... on Repository {
                        id,
                        name,
                        description,
                        url,
                        owner{
                            login
                        }
                    }
                }
            }
        }
    }
`