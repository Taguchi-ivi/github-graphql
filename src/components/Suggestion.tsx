import React from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import { editSearchName } from "../store/modules/searchName"
import { useDispatch, useSelector } from "react-redux";
import '../assets/styles/Commons.css'

type SuggestionProps = {
    onFunc: (searchItem: string) => void
}

const Suggestion: React.FC<SuggestionProps> = ({ onFunc }) => {
    const searchHistory = useSelector((state: any) => state.searchHistory.value)
    const dispatch = useDispatch();

    const historySearch = (name: string) => {
        dispatch(editSearchName(name))
        onFunc(name)
    }
    return (
        <Box className="y-search-scroll">
            {searchHistory.map((item: any) => (
                <Box
                    key={item.id}
                    cursor="pointer"
                    _hover={{ bg: "blackAlpha.300" }}
                    onClick={() => { historySearch(item.name) }}
                >
                    <Box p="3">
                        <Text fontSize="xs">
                            {item.name}
                        </Text>
                    </Box>
                    <Divider />
                </Box>
            ))}
        </Box>
    )
}

export default Suggestion