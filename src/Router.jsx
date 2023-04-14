import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './mui material-ui master docs-src_pages_premium-themes_onepirate/Home'
import SignIn from './mui material-ui master docs-src_pages_premium-themes_onepirate/SignIn'
import SignUp from './mui material-ui master docs-src_pages_premium-themes_onepirate/SignUp'
import View from './pages/View'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/view/:courseId/:chapterId/:componentId' element={<View/>}/>
        <Route path='/*' element={<h1>404 not found</h1>}/>
    </Routes>
  )
}
