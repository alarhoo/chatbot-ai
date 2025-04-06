'use client'
import { useEffect, useRef } from 'react'
import { Box, Paper, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import botImage from '../public/img/boltz.png'
import AnimatedText from './AnimatedText'
import TypingDots from './TypingDots'
import { useAppContext } from '../contexts/AppContext'

export default function ChatArea({ messages, isLoading }) {
  const chatRef = useRef(null)
  const theme = useTheme()
  const { selectedAPI, setSelectedAPI } = useAppContext() // Access context for setting selected API

  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        console.log('Scrolling to:', chatRef.current.scrollHeight)
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }, 10)
    }
  }, [messages, isLoading])

  // Glow styles for selected API
  const getGlowStyle = (apiKey) => ({
    border: selectedAPI === apiKey ? '2px solid' : 'none',
    borderColor: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  })

  const handlePaperClick = (apiKey) => {
    setSelectedAPI(apiKey) // Set the selected API when a Paper is clicked
  }

  return (
    <Box ref={chatRef} flex={1} display='flex' flexDirection='column' gap={1} p={1} height='100%' mb={5}>
      <Paper elevation={5} sx={{ p: 2, mb: 4, borderRadius: 2, width: '100%' }} className='animate__bounceIn'>
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
          {/* Clickable Papers */}
          <Paper
            elevation={2}
            sx={{ p: 2, width: '30%', textAlign: 'center', cursor: 'pointer', ...getGlowStyle('getdatafrompdf') }}
            onClick={() => handlePaperClick('getdatafrompdf')}
          >
            <Typography variant='h6'>Get Data from PDF</Typography>
            <Typography variant='body2'>Extract structured data from PDF documents efficiently.</Typography>
          </Paper>
          <Paper
            sx={{ p: 2, width: '30%', textAlign: 'center', cursor: 'pointer', ...getGlowStyle('getdatafromsql') }}
            onClick={() => handlePaperClick('getdatafromsql')}
          >
            <Typography variant='h6'>Get Data from BigQuery</Typography>
            <Typography variant='body2'>Fetch and analyze large datasets from Google BigQuery.</Typography>
          </Paper>
          <Paper
            sx={{ p: 2, width: '30%', textAlign: 'center', cursor: 'pointer', ...getGlowStyle('getdatafromimage') }}
            onClick={() => handlePaperClick('getdatafromimage')}
          >
            <Typography variant='h6'>Get Data from Image</Typography>
            <Typography variant='body2'>Extract text and information from images using OCR.</Typography>
          </Paper>
        </Box>
      </Paper>

      {/* Messages */}
      {messages.map((msg, index) => (
        <Box key={index} display='flex' flexDirection='row' alignItems='flex-start' gap={1}>
          {msg.type === 'bot' && (
            <Image
              src={botImage}
              alt='botImage'
              width={40}
              height={40}
              unoptimized
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          )}
          <Box flex={1} display='flex' flexDirection='column' gap={1}>
            <Paper
              elevation={msg.type === 'user' ? 3 : msg.type === 'bot' ? 4 : 3}
              sx={{
                p: 2,
                bgcolor: msg.type === 'user' ? '#3498db' : msg.type === 'bot' ? '#2ecc71' : '#e74c3c',
                color: 'white',
                borderRadius: 2,
                border: msg.type === 'error' ? '2px solid red' : 'none',
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: { xs: '100%', sm: '100%', md: '90%' },
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
                    marginBottom: msg.text ? 1 : 0,
                  }}
                >
                  <Image
                    src={msg.image}
                    alt='Uploaded'
                    width={200}
                    height={200}
                    unoptimized
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Box>
              )}
              {msg.text && msg.type === 'bot' ? ( // Use AnimatedText for bot responses
                <AnimatedText text={msg.text} />
              ) : (
                msg.text && <Typography style={{ whiteSpace: 'pre-line' }}>{msg.text.replace(/\\n/g, '\n')}</Typography>
              )}
            </Paper>
          </Box>
        </Box>
      ))}

      {/* Loading Indicator */}
      {isLoading && (
        <Box display='flex' alignItems='center' justifyContent='flex-start' gap={1} p={2}>
          <TypingDots />
        </Box>
      )}
    </Box>
  )
}
