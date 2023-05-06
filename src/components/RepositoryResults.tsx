import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { Box, Heading,Flex, Divider, Text } from '@chakra-ui/react';
import { useSelector } from "react-redux";

const RepositoryResults: React.FC = () => {

    const searchResults = useSelector((state: any) => state.searchResults.value)

    return (
        <>
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
        </>
    )
}

export default RepositoryResults