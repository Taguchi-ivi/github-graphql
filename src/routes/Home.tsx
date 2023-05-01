import React, { useState, useEffect } from 'react';
import {useQuery, gql, useLazyQuery} from '@apollo/client';

type Repository = {
    id: string;
    url: string;
    name: string;
    description: string;
    createdAt: string;
}
// issueの場合は作成者とリポジトリ名を入力すればissueを取得できそう
// const GET_REPOSITORY = gql`
//     query GetRepository($owner: String!, $name: String!) {
//         repository(owner: $owner, name: $name) {
//             issues(first: 10) {
//                 edges {
//                     node {
//                         title
//                     }
//                 }
//             }
//         }
//     }`
// query SearchRepository($first: Int, $after: String, $last: Int, $before: String, $query: String!) {
const RepositorySearchQuery = gql`
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

// 氏名で検索
const SearchUserQuery = gql`
    query SearchUser($query: String!) {
        search(query: $query, last: 10, type: USER) {
            edges {
                node {
                    ... on User {
                        login
                    }
                }
            }
        }
    }`
// query {
//     user(login: "taguchi-ivi") {
//         name
//         url
//         repositories(last: 20) {
//             totalCount
//             nodes {
//                 name
//                 description
//                 createdAt
//                 updatedAt
//                 url
//             }
//         }
//     }
//   }


    // const DisplayRepository = (q: string) => {
    //     const { loading, error, data } = useQuery(RepositorySearchQuery, {
    //         variables: {
    //             query: q
    //         }
    //     });

    //     if (loading) return <p>Loading...</p>;
    //     if (error) return <p>Error : {error.message}</p>;

    //     return data.locations.map(({ id, name, description }: Repository) => (
    //         <div key={id}>
    //             <h3>{name}</h3>
    //             <br />
    //             <b>About this location:</b>
    //             <p>{description}</p>
    //             <br />
    //         </div>
    //     ));
    // }

const Home: React.FC = () => {

    const [searchName, setSearchName] = useState("")
    const [cursor, setCursor] = useState<string | null>(null)
    const [searchRepositories, { loading, error, data }] = useLazyQuery(RepositorySearchQuery)
    const [results, setResults] = useState<Repository[]>([])
    const [repoCount, setRepoCount] = useState(0)
    // const [searchRepositories, { loading, error, data }] = useQuery(RepositorySearchQuery)

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // searchRepositories({variables: {query: searchName}})
        searchRepositories({variables: {
                after: null,
                query: searchName
            }})
            .then(({data}) => {
                if (data) {
                    setRepoCount(data.search.repositoryCount)
                    const repos = data.search.edges.map((edge: any) => edge.node);
                    setResults(repos);
                }
            })
    }

    const loadMore = () => {
        if (data && data.search.pageInfo.hasNextPage) {
            // setCursor(data.search.pageInfo.endCursor)
            searchRepositories({
                variables: {
                    query: searchName,
                    cursor: data.search.pageInfo.endCursor
                },
            }).then(({data}) => {
                if (data) {
                    const repos = data.search.edges.map((edge: any) => edge.node);
                    setResults([...results, ...repos]);
                }
            })
        }
    }

    // useEffect(() => {
    //     if(cursor) {
    //         searchRepositories({variables: {query: searchName, after: cursor}})
    //     }
    // })

    return (
        <div>
            <h1>My first Apollo app 🚀</h1>
            <br />
            <form onSubmit={search}>
                <h3>Form</h3>
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button type="submit">検索</button>
            </form>
            <h2>{searchName}</h2>
            {/* <DisplayRepository q={searchRepo} /> */}
            {loading && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}
            {results && (
                <div>
                    <h3>Repository Count: {repoCount}</h3>
                    <ul>
                        {results.map((repo: any, index) => (
                            // <li key={repo.id}>{repo.owner.login}/{repo.name}</li>
                            <li key={index}>{repo.owner.login}/{repo.name}</li>
                        ))}
                    </ul>
                </div>
            )
            }
            {data && data.search.pageInfo.hasNextPage && (
                <div>
                    <button onClick={loadMore}>show more</button>
                </div>
            )}
        </div>
    )
}

export default Home