import { useEffect, useState } from 'react'

import './App.css'
import TodoForm from './components/TodoForm'
import TodoTable from './components/TodoTable'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState("")
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try
    {
      const response = await axios.get("http://localhost:8000/api/todo/")
      setTodos(response.data)
      setIsLoading(false)
      console.log(response.data)
    } catch (error)
    {
      setIsLoading(false)
      console.log(error);
    }
  }
  return (
    <>
      <div className=' min-h-screen'>

        <h1 className='text-6xl p-8'>To Do List</h1>
        <TodoForm setTodos={setTodos} fetchData={fetchData} loading={loading} />
        <TodoTable todos={todos} setTodos={setTodos} loading={loading} />
      </div>
    </>
  )
}

export default App
