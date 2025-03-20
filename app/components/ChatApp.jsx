// components/ChatApp.jsx
'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Box } from '@mui/material'
import ChatArea from './ChatArea'
import QueryBox from './QueryBox'

export default function ChatApp() {
  useEffect(() => {
    const stacks = document.querySelectorAll('.MuiStack-root')
    if (stacks.length >= 7) {
      const seventhStack = stacks[6] // Get the 7th element

      // Check if it contains a nav tag
      if (seventhStack.querySelector('nav')) {
        seventhStack.style.display = 'none' // Hide it if it does
      }
    }
  }, [])

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { selectedAPI } = useAppContext()

  const handleSendQuery = async (query) => {
    setMessages((prev) => [...prev, { text: query, type: 'user' }])
    setIsLoading(true)

    try {
      const response = await fetch(`/api/chat?endpoint=${selectedAPI}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      })
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      const data = await response.json()
      setMessages((prev) => [...prev, { text: data.response || 'No response received', type: 'bot' }])
    } catch (error) {
      console.error('Error sending query:', error)
      setMessages((prev) => [...prev, { text: 'Error: Unable to fetch response', type: 'error' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box display='flex' flexDirection='column' height='100%'>
        <ChatArea messages={messages} />
        <QueryBox onSend={handleSendQuery} isLoading={isLoading} />
      </Box>
    </>
  )
}
