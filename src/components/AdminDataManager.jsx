import React, { createContext, useState } from 'react'

export const adminStore = createContext();

export default function Provider({children}) {
    const [store, setStore] = useState({})
  store.set = (key, value) => {
    setStore(state => ({...state, [key]: value}))
  }
  return (
    <adminStore.Provider value={store} children={children}/> 
  )
}
