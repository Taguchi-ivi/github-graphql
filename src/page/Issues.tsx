import React from 'react';
import { useQuery} from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
    Box, Button, Flex, Heading, Text,
    Card, CardBody, Stack, Divider
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { GET_ISSUES } from '../query/SearchIssues';
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'

const Issues: React.FC = () => {
    const params = useParams();
    const id = params.id
    const { loading, error, data } = useQuery(GET_ISSUES, {
        variables: {
            repositoryId: id
        }
    });

    const PageBack = () => {
        window.history.back()
    }

    if (loading) return <Loading />;
    if (error) return <p>Error :{error.message}</p>;

    return (
        <>
            <PageTitle pageName="Issues Search" />
            {!id && (<h3>正しいURLを指定してください</h3>)}
            {data && (
                <Card>
                    <CardBody>
                        <Button onClick={PageBack}>← back to search</Button>
                        <Flex my="8">
                            <Heading size='sm' mr="2">
                                Latest issues
                            </Heading>
                            <Text fontSize='xs' color="gray.400">
                                on {data.node.owner.login}/{data.node.name}
                            </Text>
                        </Flex>
                        <Stack>
                            {data.node.issues.edges.map(( edge: any, index: number ) => (
                                <Box key={index}>
                                    <Box p="3">
                                        <a href={edge.node.url} target="_blank" rel="noopener noreferrer">
                                            <Flex>
                                                <Text fontSize='md' color="gray.600" mr="3">
                                                    {edge.node.title}
                                                </Text>
                                                {/* <FiExternalLink /> */}
                                                <FaGithub />
                                            </Flex>
                                        </a>
                                    </Box>
                                    <Divider />
                                </Box>
                            ))}
                        </Stack>
                    </CardBody>
                </Card>
            )}
        </>
    )
}

export default Issues