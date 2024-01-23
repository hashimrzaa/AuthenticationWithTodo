import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../screens/Home/Home'
import Login from '../../screens/Login/Login'
import Signin from '../../screens/SignIn/Signin'
import Navbar from '../../components/Navbar'
import Todo from '../../screens/Home/Todo'
import ProtectedRoutes from './Protectedroutes'

const Routing = () => {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    
   <Route path='/' element={<ProtectedRoutes component={<Home/>}/>} />
    <Route path='login' element={<Login/> }/>
    <Route path='signin' element={<Signin/> }/>
    <Route path='todo' element={<ProtectedRoutes component={<Todo/>}/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default Routing