'use client'
import { createContext, useState, useContext } from 'react'

export const AppContext = createContext({
  selectedAPI: 'getdatafrompdf', // Default value
  setSelectedAPI: () => {},
})

export const AppProvider = ({ children }) => {
  const [selectedAPI, setSelectedAPI] = useState('getdatafrompdf') // Default value

  return <AppContext.Provider value={{ selectedAPI, setSelectedAPI }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
