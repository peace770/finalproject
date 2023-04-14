import React, { useContext } from 'react'
import {LoginContext} from './FirebaseContext'

export default function Some() {
    const value = useContext(LoginContext);
    console.log(value);
  return (
    <div>
      <h1>Some</h1>

      
        
    </div>
  )
}
