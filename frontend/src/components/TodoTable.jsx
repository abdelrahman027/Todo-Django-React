/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { MdDelete, MdEditNote, MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
const TodoTable = ({ todos, setTodos, loading }) => {

  const [editText, setEditText] = useState({ 'body': '' })
  const handleEdit = async (id, value) => {
    try
    {
      const response = await axios.patch(`http://localhost:8000/api/todo/${id}/`, value)
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodos)
    } catch (error)
    {
      console.log(error)
    }
  }

  const handleCheckbox = (id, value) => {
    handleEdit(id, { 'isCompleted': !value })
  }

  const handleDelete = async (id) => {
    try
    {
      await axios.delete(`http://localhost:8000/api/todo/${id}/`)
      const newList = todos.filter(todo => todo.id !== id)
      setTodos(newList)
    } catch (error)
    {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setEditText(prev => ({ ...prev, 'body': e.target.value }))
  }
  return (
    <div className="flex items-center justify-center  text-center py-6 px-10">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">CheckBox</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">To do</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Data Created</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th>

          </tr>
        </thead>
        <tbody>
          {!loading ? todos.map((todo) => (
            <tr key={todo.id} className="border-b-2">
              <td title={todo.id} className="p-3 text-2xl gap-4 flex items-center justify-center">
                {todo.isCompleted ? <span className="cursor-pointer"><MdOutlineCheckBox onClick={() => handleCheckbox(todo.id, todo.isCompleted)} /></span> : <span className="cursor-pointer"><MdCheckBoxOutlineBlank onClick={() => handleCheckbox(todo.id, todo.isCompleted)} /></span>}

              </td>
              <td className="p-3 text-sm">{todo.body}</td>
              <td className="p-3 text-sm">
                {todo.isCompleted ? <span className="bg-green-700 p-2 rounded-md">Done</span> : <span className="bg-red-700 p-2 rounded-md">Pending</span>}

              </td>
              <td className="p-3 text-sm">{new Date(todo.created).toLocaleString()}</td>
              <td className="p-3 text-2xl gap-4 flex items-center justify-center">
                <span onClick={() => document.getElementById('my_modal_1').showModal()} className="cursor-pointer hover:text-green-500"><MdEditNote onClick={() => setEditText(todo)} /></span>
                <span className="cursor-pointer hover:text-red-500"><MdDelete onClick={() => handleDelete(todo.id)} /></span>
              </td>
            </tr>
          )) : <tr><td>Loading...</td></tr>}

        </tbody>
      </table>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo!</h3>
          <input type="text" onChange={handleChange} placeholder="New Todo" className="input input-bordered w-full max-w-xs mt-12" />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn">Close</button>

              <button className="btn" onClick={() => handleEdit(editText.id, editText)}>Edit</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default TodoTable