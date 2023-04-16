import React from 'react'
import { signOutUser } from '../components/FirebaseContext'
import { redirect, useLocation, useNavigate } from 'react-router-dom'

export default function Logout() {
    signOutUser()
    // window.location.assign('/')
  return (
    <div>Logout...</div>
  )
}
