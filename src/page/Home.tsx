import React from 'react';
import { useLazyQuery} from '@apollo/client';
import { Box, Heading, Card, CardBody, Stack, Flex } from '@chakra-ui/react';
import { RepositorySearchQuery } from '../query/SearchRepository';
import { editPageInfo, resetPageInfo } from "../store/modules/pageInfo"
import { editRepositoryCount } from '../store/modules/repositoryCount';
import { resetSearchResult ,addSearchResult } from '../store/modules/searchResults';
import { editSearchHistory } from '../store/modules/searchHistory';
import { useDispatch, useSelector } from "react-redux";
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import RepositoryResults from '../components/RepositoryResults'
import RepositoryForm from '../components/RepositoryForm'
import RepositoryShowMore from '../components/RepositoryShowMore'

const Home: React.FC = () => {

    const [searchRepositories, { loading, error }] = useLazyQuery(RepositorySearchQuery)

    const searchName = useSelector((state: any) => state.searchName)
    const pageInfo = useSelector((state: any) => state.pageInfo)
    const repositoryCount = useSelector((state: any) => state.repositoryCount)
    const searchResults = useSelector((state: any) => state.searchResults.value)
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
                    <RepositoryForm defaultSearch={defaultSearch} />
                    {loading && pageInfo.firstFlg && <Loading />}
                    {error && <p>Error : {error.message}</p>}
                    {repositoryCount > -1 && (
                        <Flex justify="end">
                            <Heading size="sm" mt="5">
                                Repository Count: {searchResults.length}/{repositoryCount}
                            </Heading>
                        </Flex>
                    )}
                    <Stack spacing='4'>
                        <RepositoryResults />
                        {loading && !pageInfo.firstFlg && <Loading />}
                        {searchResults && pageInfo && pageInfo.hasNextPage && (
                            <RepositoryShowMore loadMore={loadMore} />
                        )}
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    )
}

export default Home