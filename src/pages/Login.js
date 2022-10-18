import React from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <AuthForm isRegister={false} onSubmit={handleSubmit} />
      <Link to='/register'>register</Link>
    </div>
  )
}

export default Login
