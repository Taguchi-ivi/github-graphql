import React from 'react'
import { useState } from 'react'

interface FormProps {
    createTodo: (todo: Todo) => void
}
interface Todo {
    id: number;
    content: string;
}


const Form = ({createTodo}: FormProps) => {
    const [enteredTodo, setEnteredTodo ] = useState('')
    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = {
            id: Math.random(),
            content: enteredTodo
        };
        createTodo(newTodo)

        setEnteredTodo('')
    }
    return (
        <>
            <form onSubmit={addTodo}>
                <h3>Form</h3>
                <input type="text" value={enteredTodo} onChange={(e) => setEnteredTodo(e.target.value)}/>
                <button>追加</button>
            </form>
        </>
    )
}

export default Form