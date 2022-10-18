import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { getObjForm } from '../utils/form'
import { login } from '../service/auth'
import Alert from '../components/Alert'
import { useAuth } from '../contexts/AuthProvider'

const Login = () => {
  const [error, setError] = useState()
  const { setUserInfo } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = getObjForm(event.target)
    login(data)
      .then((data) => {
        setUserInfo(data.user)
      })
      .catch((resError) => {
        setError(resError.response.data)
      })
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      {error && <Alert error={error} />}
      <AuthForm isRegister={false} onSubmit={handleSubmit} />
      <Link to='/register'>register</Link>
    </div>
  )
}

export default Login
