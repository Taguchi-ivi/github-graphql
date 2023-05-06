import React from 'react';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';

type IssuesHeaderProps = {
    data: any
}

const IssuesHeader: React.FC<IssuesHeaderProps> = ({ data }) => {

    const PageBack = () => {
        window.history.back()
    }

    return (
        <>
            <Button onClick={PageBack}>← back to search</Button>
            <Flex my="8">
                <Heading size='sm' mr="2">
                    Latest issues
                </Heading>
                <Text fontSize='xs' color="gray.400">
                    on {data.node.owner.login}/{data.node.name}
                </Text>
            </Flex>
        </>

    )
}

export default IssuesHeader