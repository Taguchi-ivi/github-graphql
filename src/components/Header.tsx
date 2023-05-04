import { Heading, Box } from "@chakra-ui/react";

const Header = () => {
    return (
        <Box background="gray.500" w='100%' p={4}>
            <Heading as="h1">My GitHub GraphQL API app 🚀</Heading>
        </Box>
    )
}

export default Header