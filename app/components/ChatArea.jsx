'use client'
import { useEffect, useRef } from 'react'
import { Box, Paper, Typography } from '@mui/material'

export default function ChatArea({ messages }) {
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Box ref={chatRef} flex={1} overflow='auto' display='flex' flexDirection='column' gap={1} p={2} height='100%'>
      {messages.map((msg, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            bgcolor: msg.type === 'user' ? '#3498db' : msg.type === 'bot' ? '#2ecc71' : '#e74c3c',
            color: 'white',
            borderRadius: 2,
            border: msg.type === 'error' ? '2px solid red' : 'none',
            alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '70%',
          }}
        >
          <Typography>{msg.text}</Typography>
        </Paper>
      ))}
    </Box>
  )
}
