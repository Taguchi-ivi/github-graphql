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
import { editPageInfo, resetPageInfo } from "../store/modules/pageInfo"
import { editRepositoryCount } from '../store/modules/repositoryCount';
import { resetSearchResult ,addSearchResult } from '../store/modules/searchResults';
import { editSearchHistory } from '../store/modules/searchHistory';
import { useSelector } from "react-redux"


const Home: React.FC = () => {

    const [searchRepositories, { loading, error }] = useLazyQuery(RepositorySearchQuery)
    const [focusFlg, setFocusFlg] = useState<boolean>(false)

    const searchName = useSelector((state: any) => state.searchName)
    const pageInfo = useSelector((state: any) => state.pageInfo)
    const repositoryCount = useSelector((state: any) => state.repositoryCount)
    const searchResults = useSelector((state: any) => state.searchResults.value)
    const searchHistory = useSelector((state: any) => state.searchHistory.value)
    const dispatch = useDispatch();

    const defaultSearch = (searchItem: string = searchName) => {
        dispatch(resetSearchResult())
        dispatch(resetPageInfo())
        dispatch(editSearchHistory(searchItem))
        searchRepositories({variables: {
            query: searchItem,
            after: null
        }})
            .then(({data}) => {
                if (data) {
                    const repos = data.search.edges.map((edge: any) => edge.node);
                    dispatch(addSearchResult(repos))
                    dispatch(editRepositoryCount(data.search.repositoryCount))
                    dispatch(editPageInfo(data.search.pageInfo))
                }
            })
    }

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        defaultSearch()
    }

    const onFocusFunc = () => {
        setFocusFlg(true)
    }

    const onBlurFunc = () => {
        setTimeout(() => {
            setFocusFlg(false);
        }, 100);
    }

    const historySearch = (name: string) => {
        dispatch(editSearchName(name))
        defaultSearch(name)
    }

    const loadMore = () => {
        if (searchResults && pageInfo && pageInfo.hasNextPage) {
            searchRepositories({
                variables: {
                    query: searchName,
                    after: pageInfo.cursor
                },
            })
            .then(({data}) => {
                if (data) {
                    const repos = data.search.edges.map((edge: any) => edge.node);
                    dispatch(addSearchResult(repos))
                    dispatch(editPageInfo(data.search.pageInfo))
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
            <Card>
                <CardBody>
                    <form onSubmit={search}>
                        <Flex>
                            <Box w='80%'>
                                <Input
                                    focusBorderColor='teal.500'
                                    placeholder='Search Repository'
                                    type="text"
                                    value={searchName}
                                    onFocus={onFocusFunc}
                                    onBlur={onBlurFunc}
                                    onChange={(e) => dispatch(editSearchName(e.target.value))}
                                />
                                {focusFlg && searchHistory.length > 0 && (
                                    <Box className="y-search-scroll">
                                        {searchHistory.map((item: any) => (
                                            <Box
                                                key={item.id}
                                                cursor="pointer"
                                                _hover={{ bg: "blackAlpha.300" }}
                                                onClick={() => { historySearch(item.name) }}
                                            >
                                                <Box p="3">
                                                    <Text fontSize="xs">
                                                        {item.name}
                                                    </Text>
                                                </Box>
                                                <Divider />
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                            <Button type="submit" ml="2">Search</Button>
                        </Flex>
                    </form>
                    {loading && pageInfo.firstFlg && <Loading />}
                    {error && <p>Error : {error.message}</p>}
                    {repositoryCount > -1 && <Flex justify="end"><Heading size="sm" mt="5">Repository Count: {searchResults.length}/{repositoryCount}</Heading></Flex>}
                    <Stack spacing='4'>
                        {searchResults && searchResults.length > 0 && (
                            <Box my="7" className="y-result-scroll" p={2}>
                                {searchResults.map((repo: any, index: number) => (
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
                        {loading && !pageInfo.firstFlg && <Loading />}
                        {searchResults && pageInfo && pageInfo.hasNextPage && (
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