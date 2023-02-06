import React, { useContext } from 'react'
import {LoginContext} from './FirebaseContext'

export default function Some() {
    const value = useContext(LoginContext);
    console.log(value);
  return (
    <div>Some
        <input value={value.value} onInput={e => value.set(e.target.value)}/>
        <div>{value.value}</div>
    </div>
  )
}
