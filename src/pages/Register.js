import React from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

const Register = () => {
  return (
    <div className='container'>
      <h1>Register</h1>
      <AuthForm isRegister={true} />
      <Link to='/login'>login</Link>
    </div>
  )
}

export default Register
