import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const navigate=useNavigate()
  const token=localStorage.getItem('token');
  console.log(token)
  return (
    token?children: <Navigate to={'/register'} />
  )
}

export default PrivateRoute