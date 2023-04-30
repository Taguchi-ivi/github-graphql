import React, { useState } from 'react';
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
const RepositorySearchQuery = gql`
    query SearchRepository($query: String!) {
        search(query: $query, last: 10, type: REPOSITORY) {
            repositoryCount
            edges {
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
    const [searchRepositories, { loading, error, data }] = useLazyQuery(RepositorySearchQuery)

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(searchName)
        // console.log(e)
        searchRepositories({variables: {query: searchName}})
    }
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
            {data && (
                <div>
                    <h4>{data.search.repositoryCount}</h4>
                    <ul>
                        {data.search.edges.map((edge: any) => (
                            <li key={edge.node.id}>{edge.node.owner.login}/{edge.node.name},{edge.node.description}</li>
                        ))}
                        {/* <li key="123">{data}</li> */}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Home