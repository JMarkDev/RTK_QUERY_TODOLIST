import { useState } from "react"
import { BsUpload,
         BsTrash } from "react-icons/bs"
import { 
        useGetTodosQuery, 
        useAddTodoMutation,
        useUpdateTodoMutation,
        useDeleteTodoMutation } from "../api/apiSlice"
import SpinnerTemp from "../../components/SpinnerTemp"
import "../../Styles/Todo.css"

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("")

    const { 
        data: todos,
        isLoading, 
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')
    }

    const newItemSection = 
        <form onSubmit={handleSubmit}>
            <div className="new_todo">
               <input 
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter new todo"
               /> 
               <button type="submit">
                <BsUpload />
                </button>
            </div>
        </form>
        
        let content;
        if (isLoading) {
            content = <SpinnerTemp />
        } else if (isSuccess) {
            content =  todos.map(todo => { 
                return (
                    <article className="list" key={todo.id}>
                        <div className="todo">
                            <input 
                                type="checkbox"
                                checked={todo.completed}
                                id={todo.id}
                                onChange={() => updateTodo({ ...todo, completed: !todo.completed})} 
                            />
                            <label htmlFor={todo.id}>{todo.title}</label>
                        </div>
                        <button className="trash" onClick={() => deleteTodo(todo.id )}>
                            <BsTrash />
                        </button>
                    </article>
                )
            })             
        } else if (isError) {
            content = <p>{error.error}</p>
        }


  return (
    <>
    <main className="todo_list">
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main>
    </>
    
  )
}

export default TodoList
