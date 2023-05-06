import React from 'react';
import { Stack, Box, Divider, Flex, Text } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

type IssuesListProps = {
    data: any
}

const IssuesList: React.FC<IssuesListProps> = ({ data }) => {
    return (
        <Stack>
            {data.node.issues.edges.map(( edge: any, index: number ) => (
                <Box key={index}>
                    <Box p="3">
                        <a href={edge.node.url} target="_blank" rel="noopener noreferrer">
                            <Flex>
                                <Text fontSize='md' color="gray.600" mr="3">
                                    {edge.node.title}
                                </Text>
                                <FaGithub />
                            </Flex>
                        </a>
                    </Box>
                    <Divider />
                </Box>
            ))}
        </Stack>
    )
}

export default IssuesList