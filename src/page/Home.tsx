import React, { useState } from 'react';
import { useLazyQuery} from '@apollo/client';
import {
    Box, Heading, Button, Input,
    Card, CardBody, Stack, Flex
} from '@chakra-ui/react';
import { RepositorySearchQuery } from '../query/SearchRepository';
import { editSearchName } from "../store/modules/searchName"
import { editPageInfo, resetPageInfo } from "../store/modules/pageInfo"
import { editRepositoryCount } from '../store/modules/repositoryCount';
import { resetSearchResult ,addSearchResult } from '../store/modules/searchResults';
import { editSearchHistory } from '../store/modules/searchHistory';
import { useDispatch, useSelector } from "react-redux";
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import RepositoryResults from '../components/RepositoryResults'
import Suggestion from '../components/Suggestion'


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

    return (
        <Box w='80%' p={4} mx="auto" >
            <PageTitle pageName="Repository Search" />
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
                                    <Suggestion onFunc={defaultSearch}/>
                                )}
                            </Box>
                            <Button type="submit" ml="2">Search</Button>
                        </Flex>
                    </form>
                    {loading && pageInfo.firstFlg && <Loading />}
                    {error && <p>Error : {error.message}</p>}
                    {repositoryCount > -1 && <Flex justify="end"><Heading size="sm" mt="5">Repository Count: {searchResults.length}/{repositoryCount}</Heading></Flex>}
                    <Stack spacing='4'>
                        <RepositoryResults />
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