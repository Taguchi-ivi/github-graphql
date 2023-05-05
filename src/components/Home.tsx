import React, { useState } from 'react';
import { useLazyQuery} from '@apollo/client';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import {
    Box, Heading, Button, Input,
    Card, CardBody, Stack, Flex, Divider, Text
} from '@chakra-ui/react';
import Loading from './Loading'
import '../assets/styles/Commons.css'
import { RepositorySearchQuery } from '../query/SearchRepository';
import { useDispatch } from "react-redux";
import { editSearchName } from "../store/modules/searchName"
import { editCursor } from "../store/modules/cursor"
import { useSelector } from "react-redux"

type Repository = {
    id: string;
    url: string;
    name: string;
    description: string;
    createdAt: string;
}

const Home: React.FC = () => {

    // const [cursor, setCursor] = useState<string | null>(null)
    const [searchRepositories, { loading, error, data }] = useLazyQuery(RepositorySearchQuery)
    const [results, setResults] = useState<Repository[]>([])
    const [repoCount, setRepoCount] = useState(-1)
    const [firstFlg, setFirstFlg] = useState<boolean>(true)

    const searchName = useSelector((state: any) => state.searchName)
    const cursor = useSelector((state: any) => state.cursor)
    const dispatch = useDispatch();

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                    // setCursor(data.search.pageInfo.endCursor)
                    dispatch(editCursor(data.search.pageInfo.endCursor))
                }
            })
    }

    const loadMore = () => {
        if (data && data.search.pageInfo.hasNextPage) {
            searchRepositories({
                variables: {
                    query: searchName,
                    after: cursor
                },
            }).then(({data}) => {
                if (data) {
                    const repos = data.search.edges.map((edge: any) => edge.node);
                    setResults([...results, ...repos]);
                    // setCursor(data.search.pageInfo.endCursor)
                    dispatch(editCursor(data.search.pageInfo.endCursor))
                }
            })
        }
    }

    const componentName = "Repository Search"
    return (
        <Box w='80%' p={4} mx="auto" >
            <Helmet>
                <title>{componentName}</title>
            </Helmet>
            <br />
            <Heading>{searchName}</Heading>
            <Card>
                <CardBody>
                    <form onSubmit={search}>
                        <Flex>
                            <Input
                                focusBorderColor='teal.500'
                                placeholder='Search Repository'
                                type="text"
                                value={searchName}
                                onChange={(e) => dispatch(editSearchName(e.target.value))}
                            />
                            <Button type="submit" ml="2">Search</Button>
                        </Flex>
                    </form>
                    {loading && firstFlg && <Loading />}
                    {error && <p>Error : {error.message}</p>}
                    {repoCount > -1 && <Flex justify="end"><Heading size="sm" mt="5">Repository Count: {results.length}/{repoCount}</Heading></Flex>}
                    <Stack spacing='4'>
                        {results && results.length > 0 && (
                            <Box my="7" className="y-scroll">
                                {results.map((repo: any, index) => (
                                    // <li key={repo.id}>{repo.owner.login}/{repo.name}</li>
                                    <Box key={index}>
                                        <Box p="3">
                                            <Flex>
                                                <Link to={`/issues/${repo.id}`}>
                                                    <Heading size='sm' mr="5">
                                                        {repo.owner.login}/{repo.name}
                                                    </Heading>
                                                </Link>
                                                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                                                    <FaGithub size="1rem" />
                                                </a>
                                            </Flex>
                                            <Link to={`/issues/${repo.id}`}>
                                                <Text fontSize='xs' color="gray.400">
                                                    {repo.description}
                                                </Text>
                                            </Link>
                                        </Box>
                                        <Divider />
                                    </Box>
                                ))}
                            </Box>
                        )}
                        {loading && !firstFlg && <Loading />}
                        {data && data.search.pageInfo.hasNextPage && (
                            <Box>
                                <Button
                                    width='100%'
                                    onClick={loadMore}
                                    loadingText='Submitting'
                                    colorScheme='teal'
                                    variant='outline'
                                >
                                    show more
                                </Button>
                            </Box>
                        )}
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    )
}

export default Home