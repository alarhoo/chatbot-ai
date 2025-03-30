'use client'
import { useEffect, useRef } from 'react'
import { Box, Paper, Typography, CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useAppContext } from '../contexts/AppContext'

export default function ChatArea({ messages }) {
  const chatRef = useRef(null)
  const { isLoading } = useAppContext()

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isLoading])

  return (
    <Box ref={chatRef} flex={1} overflow='auto' display='flex' flexDirection='column' gap={1} p={2} height='100%'>
      <Typography variant='h1' className='gradient-text' textAlign='center'>
        Welcome to our AI-powered assistant!
      </Typography>
      <Typography variant='h6' textAlign='center' mb={2}>
        I can help you retrieve data from PDFs, BigQuery, and Images. Please select an option from the menu in query
        box.
      </Typography>
      <Box
        display='flex'
        gap={2}
        justifyContent='center'
        sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
        mb={2}
      >
        <Paper sx={{ p: 2, width: '30%', textAlign: 'center' }}>
          <Typography variant='h6'>Get Data from PDF</Typography>
          <Typography variant='body2'>Extract structured data from PDF documents efficiently.</Typography>
        </Paper>
        <Paper sx={{ p: 2, width: '30%', textAlign: 'center' }}>
          <Typography variant='h6'>Get Data from BigQuery</Typography>
          <Typography variant='body2'>Fetch and analyze large datasets from Google BigQuery.</Typography>
        </Paper>
        <Paper sx={{ p: 2, width: '30%', textAlign: 'center' }}>
          <Typography variant='h6'>Get Data from Image</Typography>
          <Typography variant='body2'>Extract text and information from images using OCR.</Typography>
        </Paper>
      </Box>

      {messages.map((msg, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 2,
            bgcolor: msg.type === 'user' ? '#3498db' : msg.type === 'bot' ? '#2ecc71' : '#e74c3c',
            color: 'white',
            borderRadius: 2,
            border: msg.type === 'error' ? '2px solid red' : 'none',
            alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '70%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {msg.image && (
            <Box
              sx={{
                width: 200,
                height: 200,
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                marginBottom: msg.text ? 1 : 0, // Adds spacing if text is present
              }}
            >
              {' '}
              <Image
                src={msg.image}
                alt='Uploaded'
                width={200}
                height={200}
                unoptimized // Necessary for data URLs
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </Box>
          )}
          {msg.text && <Typography>{msg.text}</Typography>}
        </Paper>
      ))}

      {isLoading && (
        <Box display='flex' alignItems='center' justifyContent='flex-start' gap={1} p={2}>
          <CircularProgress size={20} color='secondary' />
          <Typography variant='body2' color='textSecondary'>
            Querying...
          </Typography>
        </Box>
      )}
    </Box>
  )
}
