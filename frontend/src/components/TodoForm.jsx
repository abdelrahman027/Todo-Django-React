/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"


const TodoForm = ({ setTodos, fetchData }) => {
    const [newTodo, setNewTodo] = useState({
        'body': ''
    })
    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
        console.log(newTodo)
    }

    const postTodo = async () => {
        try
        {
            await axios.post("http://localhost:8000/api/todo/", newTodo)
            setTodos(prevTodos => [...prevTodos, newTodo])
            fetchData()
        } catch (error)
        {
            console.log(error);
        }
        setNewTodo({ 'body': '' })
    }
    return (
        <div className="flex item-center justify-center">
            <input type="text" placeholder="Type Todo" className="input input-bordered w-full max-w-xs" onChange={handleChange} value={newTodo.body} />
            <button onClick={postTodo} className="btn btn-outline ml-3">Add Todo</button>
        </div>
    )
}

export default TodoForm