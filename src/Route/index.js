import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import * as Auth from './auth'
import Login from '../Component/login/Login'
import SignUp from '../Component/signUp/Signup'
import Marketdata from '../Component/dashboard/Marketdata'
import Admin from '../Component/admin/admin'
import Video from '../Component/video/video'

const RouterPage = () => {

  const PublicRoute = ({children, redirect}) => {
    const isLogin = Auth.isAuth()
    return isLogin ? <Navigate to = {redirect} /> : children
  }

  // PrivateRoute component renders its children if user is authenticated, otherwise redirects
  const PrivateRoute = ({children, redirect}) => {
    const isLogin = Auth.isAuth()
    return isLogin ? children : <Navigate to = {redirect} />
  }
  return (
    <>
      <Routes>
        <Route exact path='/' element = {<PublicRoute redirect={'/dashboard'}><Login /></PublicRoute>} />
        <Route exact path='/signup' element = {<PublicRoute redirect={'/dashboard'}><SignUp /></PublicRoute>} />
        <Route exact path = '/dashboard' element={<PrivateRoute redirect={'/'}><Marketdata /></PrivateRoute>} />
        <Route exact path='/admin' element= {<Admin />} /> 
        <Route exact path='/video' element = {<Video />} />
        <Route path="*" element={<Video />} />
      </Routes>
    </>
  )
}

export default RouterPage