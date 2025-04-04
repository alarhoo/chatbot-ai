// components/ChatApp.jsx
'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Box } from '@mui/material'
import AnimatedSearch from './AnimatedSearch'
import WelcomeBox from './WelcomeBox'
import PromptResponse from './PromptResponse'
import PromptBox from './PromptBox'

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

  const handleSendQuery = async (query, image) => {
    // Add user's message (with text and/or image)
    setMessages((prev) => [...prev, { text: query, type: 'user', image }])
    setIsLoading(true)

    try {
      const response = await fetch(`/api/chat?endpoint=${selectedAPI}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      })
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      const data = await response.json()
      console.log(data)

      let footnote = null
      if (selectedAPI === 'getdatafromsql' && data.debug_info && data.debug_info.generated_sql) {
        footnote = { title: 'Generated SQL', content: data.debug_info.generated_sql }
      } else if (data.source_documents && data.source_documents.length > 0) {
        // Filter out duplicate source documents based on gcs_link
        const uniqueSourceDocuments = []
        const seenLinks = new Set()
        data.source_documents.forEach((doc) => {
          if (!seenLinks.has(doc.gcs_link)) {
            uniqueSourceDocuments.push(doc)
            seenLinks.add(doc.gcs_link)
          }
        })
        footnote = { title: 'Source Documents', content: uniqueSourceDocuments }
      }

      setMessages((prev) => [
        ...prev,
        {
          text: data.text || 'No response received',
          type: 'bot',
          footnote: footnote,
        },
      ])
    } catch (error) {
      console.error('Error sending query:', error)
      setMessages((prev) => [...prev, { text: 'Error: Unable to fetch response', type: 'error' }])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <Box display='flex' flexDirection='column' height='100%' className='chat-container'>
      <WelcomeBox />
      {/* <PromptResponse />
      <Box sx={{ position: 'sticky', bottom: 0, width: '100%' }}>
        <PromptBox />
      </Box> */}
    </Box>
  )
}
