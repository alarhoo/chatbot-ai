'use client'
import { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import Conversation from './Conversation'

export default function ChatArea({ messages, isLoading }) {
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      // Scroll to the top whenever messages are updated (new question asked)
      chatRef.current.scrollTop = 0
    }
  }, [messages])

  return (
    <Box ref={chatRef} flex={1} overflowY='auto' display='flex' flexDirection='column' p={2}>
      <Typography variant='h1' className='gradient-text' textAlign='center' mb={3}>
        Welcome to our AI-powered assistant!
      </Typography>
      <Typography variant='h6' textAlign='center' mb={4} color='textSecondary'>
        I can help you retrieve data from PDFs, BigQuery, and Images. Please select an option from the menu in the query
        box.
      </Typography>
      {messages?.map((msg, index) => (
        <Conversation
          key={index}
          question={msg.type === 'user' ? msg.text : messages[index - 1]?.text || 'Question'}
          response={msg.type === 'bot' ? msg.text : null}
          footnote={msg.type === 'bot' ? msg.footnote : null}
          isLoading={isLoading && index === messages.length - 1 && msg.type !== 'user'}
        />
      ))}
    </Box>
  )
}
