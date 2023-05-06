import React from 'react';
import { Box, Button } from '@chakra-ui/react';

type RepositoryShowMoreProps = {
    loadMore: () => void
}

const RepositoryShowMore: React.FC<RepositoryShowMoreProps> = ({ loadMore }) => {
    return (
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
    )
}

export default RepositoryShowMore