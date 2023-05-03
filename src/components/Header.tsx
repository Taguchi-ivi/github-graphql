import { Heading, Box } from "@chakra-ui/react";

const Header = () => {
    return (
        // <h1>My first Apollo app 🚀</h1>
        <Box background="gray.500" w='100%' p={4}>
            <Heading as="h1">My first Apollo app 🚀</Heading>
        </Box>
    )
}

export default Header