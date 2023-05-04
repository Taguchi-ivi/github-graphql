
import React from 'react';
// import { Link, useRouteError} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';

const ErrorPage: React.FC = () => {
    // const error = useRouteError();
    // console.error(error);

    return (
        <Box w="80%" mx="auto">
            <Card color="red.600" bg="red.100" w="100%">
                <CardHeader mx="auto">
                    <Heading size="lg">Error</Heading>
                </CardHeader>
                <CardBody mx="auto">
                    <Link to="/">
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <AiFillHome />
                        </Box>
                        <Text>Go back to Search Repository.</Text>
                    </Link>
                </CardBody>
            </Card>
        </Box>
    )
}

export default ErrorPage