// import React, { useState, useEffect } from 'react';
// import {useQuery, gql, useLazyQuery} from '@apollo/client';
import React, { useState } from 'react';
import { gql, useLazyQuery} from '@apollo/client';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

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
// const SearchUserQuery = gql`
//     query SearchUser($query: String!) {
//         search(query: $query, last: 10, type: USER) {
//             edges {
//                 node {
//                     ... on User {
//                         login
//                     }
//                 }
//             }
//         }
//     }`
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
    const [repoCount, setRepoCount] = useState(-1)
    const [firstFlg, setFirstFlg] = useState<boolean>(true)
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
                    setFirstFlg(false);
                    setCursor(data.search.pageInfo.endCursor)
                }
            })
    }

    const loadMore = () => {
        if (data && data.search.pageInfo.hasNextPage) {
            // setCursor(data.search.pageInfo.endCursor)
            searchRepositories({
                variables: {
                    query: searchName,
                    after: cursor
                },
            }).then(({data}) => {
                if (data) {
                    const repos = data.search.edges.map((edge: any) => edge.node);
                    setResults([...results, ...repos]);
                    setCursor(data.search.pageInfo.endCursor)
                }
            })
        }
    }

    // useEffect(() => {
    //     if(cursor) {
    //         searchRepositories({variables: {query: searchName, after: cursor}})
    //     }
    // })
    const componentName = "Repository Search"
    return (
        <div>
            <Helmet>
                <title>{componentName}</title>
            </Helmet>
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
            {loading && firstFlg && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}
            {repoCount > -1 && <h3>Repository Count: {results.length}/{repoCount}</h3>}
            {results && (
                <div>
                    <ul>
                        {results.map((repo: any, index) => (
                            // <li key={repo.id}>{repo.owner.login}/{repo.name}</li>
                            <li key={index}>
                                <Link to={`/issues/${repo.id}`}>
                                    {repo.owner.login}/{repo.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )
            }
            {loading && !firstFlg && <p>Loading...</p>}
            {data && data.search.pageInfo.hasNextPage && (
                <div>
                    <button onClick={loadMore}>show more</button>
                </div>
            )}
        </div>
    )
}

export default Home