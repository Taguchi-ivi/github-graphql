import { useState } from 'react'
import TodoList from './TodoList'
import Form from './Form'

interface Todo {
    id: number;
    content: string
}



const MyTodo = () => {
    const todosList: Todo[] = [
        {
            id: 1,
            content: "店を予約する"
        },
        {
            id: 2,
            content: "卵を買う"
        },
        {
            id: 3,
            content: "郵便を出す"
        },
    ]

    const [ todos, setTodos ] = useState<Todo[]>(todosList)

    const deleteTodo = (id: number) => {
        const newTodos = todos.filter((todo) => {
            return todo.id !== id
        })
        setTodos(newTodos)
    }

    const createTodo = (todo: Todo) => {
        setTodos([...todos, todo])
    }

    return (
        <>
            <h3>Reminder</h3>
            <TodoList todos={todos} deleteTodo={deleteTodo}/>
            <Form createTodo={createTodo}/>
        </>
    )
}

export default MyTodo