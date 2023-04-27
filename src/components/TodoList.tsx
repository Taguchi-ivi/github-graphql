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
        <div>
            {todos.map((todo: Todo) => {
                return (
                    <div key={todo.id}>
                        <button onClick={() => complete(todo.id)}>完了</button>
                        <span>{todo.content}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoList