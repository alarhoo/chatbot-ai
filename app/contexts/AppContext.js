'use client'
import { createContext, useState, useContext } from 'react'
import ChatIcon from '@mui/icons-material/Chat'

export const AppContext = createContext({
  selectedAPI: 'getdatafrompdf',
  setSelectedAPI: () => {},
})

export const AppProvider = ({ children }) => {
  const [selectedAPI, setSelectedAPI] = useState('getdatafrompdf')
  const [isLoading, setIsLoading] = useState(false)
  const [chatNavigation, setChatNavigation] = useState([
    {
      segment: '',
      title: 'Chat',
      icon: <ChatIcon />,
    },
  ])

  return (
    <AppContext.Provider value={{ selectedAPI, setSelectedAPI, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
