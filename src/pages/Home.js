import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import TodoItem from '../components/TodoItem'
import { useAuth } from '../contexts/AuthProvider'
import { getObjForm } from '../utils/form'

async function getTodo() {
  const res = await axios.get('http://localhost:4000/todos')
  return res.data
}

async function addTodo(todo) {
  const res = await axios.post('http://localhost:4000/todos', todo)
  return res.data
}
async function deleteTodo(id) {
  const res = await axios.delete(`http://localhost:4000/todos/${id}`)
  return res.data
}

async function toggleTodo(id, status) {
  const res = await axios.patch(`http://localhost:4000/todos/${id}`, {
    completed: status,
  })
  return res.data
}

const Home = () => {
  const [todos, setTodos] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    getTodo().then((data) => {
      setTodos(data)
    })
  }, [])

  const onAddTodo = (e) => {
    e.preventDefault()
    const todoForm = getObjForm(e.target)
    addTodo(todoForm).then((data) => {
      console.log(data)
      setTodos((todos) => [...todos, data.todo])
    })
    e.target.reset()
  }

  const OnDeleteTodo = (id) => {
    deleteTodo(id).then(() => {
      setTodos((todos) => todos.filter((todo) => todo.id !== id))
    })
  }

  const onToggleTodo = (id, status) => {
    toggleTodo(id, status).then(() => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: status } : todo
        )
      )
    })
  }
  return (
    <div className='container'>
      <h1>{user.name}'s Todolist</h1>
      <AddTodoForm onSubmit={onAddTodo} />
      <div className='todo-list'>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={OnDeleteTodo}
            onToggle={onToggleTodo}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
