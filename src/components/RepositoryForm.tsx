import React, { useState } from 'react';
import { Box, Divider, Text, Flex, Input, Button } from '@chakra-ui/react';
import { editSearchName } from "../store/modules/searchName"
import { useDispatch, useSelector } from "react-redux";
import '../assets/styles/Commons.css'

type SuggestionProps = {
    defaultSearch: (searchItem?: string) => void
}

const RepositoryForm: React.FC<SuggestionProps> = ({ defaultSearch }) => {
    const [focusFlg, setFocusFlg] = useState<boolean>(false)
    const searchHistory = useSelector((state: any) => state.searchHistory.value)
    const searchName = useSelector((state: any) => state.searchName)
    const dispatch = useDispatch();

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        defaultSearch()
    }

    const historySearch = (name: string) => {
        dispatch(editSearchName(name))
        defaultSearch(name)
    }

    const onFocusFunc = () => {
        setFocusFlg(true)
    }

    const onBlurFunc = () => {
        setTimeout(() => {
            setFocusFlg(false);
        }, 100);
    }

    return (
        <form onSubmit={search}>
            <Flex>
                <Box w='80%'>
                    <Input
                        focusBorderColor='teal.500'
                        placeholder='Search Repository'
                        type="text"
                        value={searchName}
                        onFocus={onFocusFunc}
                        onBlur={onBlurFunc}
                        onChange={(e) => dispatch(editSearchName(e.target.value))}
                    />
                    {focusFlg && searchHistory.length > 0 && (
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
                    )}
                </Box>
                <Button type="submit" ml="2">Search</Button>
            </Flex>
        </form>
    )
}

export default RepositoryForm