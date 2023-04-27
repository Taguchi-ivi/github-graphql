import { VStack, StackDivider, HStack, IconButton, Text } from '@chakra-ui/react'
import { VscCheck } from 'react-icons/vsc'

interface Todo {
    id: number;
    content: string;
}

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (id: number) => void
}

const TodoList = ({todos, deleteTodo}: TodoListProps) => {

    const complete = (id: number) => {
        deleteTodo(id)
    }
    return (
        // color={{sm, md, lg, xl, '2xl'}} メディアクエリ
        <VStack
            divider={<StackDivider /> }
            borderColor="blackAlpha.100"
            color={{sm: 'red.600', md: 'blue.600', lg: 'green.600', xl: 'yellow.600'}}
            borderWidth="1px"
            borderRadius="3px"
            p={5}
            alignItems="start"
        >
            {todos.map((todo: Todo) => {
                return (
                    <HStack key={todo.id} spacing="5">
                        <IconButton
                            onClick={() => complete(todo.id)}
                            icon={<VscCheck />}
                            aria-label={`Complete "${todo.content}"`}
                            isRound
                            bgColor="chan.100"
                        >
                            完了
                        </IconButton>
                        <Text>{todo.content}</Text>
                    </HStack>
                )
            })}
        </VStack>
    )

}
export default TodoList