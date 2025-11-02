import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/sign-in' element={<Signin />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes