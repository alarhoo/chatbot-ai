'use client'
import { useEffect, useRef } from 'react'
import { Box, Paper, Typography, CircularProgress, Link, Avatar } from '@mui/material'
import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import botImage from '../public/img/boltz.png'
import AnimatedText from './AnimatedText'
import TypingDots from './TypingDots'

export default function ChatArea({ messages, isLoading }) {
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        console.log('Scrolling to:', chatRef.current.scrollHeight)
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }, 10)
    }
  }, [messages, isLoading])

  return (
    <Box ref={chatRef} flex={1} display='flex' flexDirection='column' gap={1} p={2} height='100%'>
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
              elevation={0}
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

            {msg.footnote && (
              <Box
                mt={1}
                ml={msg.type === 'user' ? 'auto' : 0}
                mr={msg.type === 'user' ? 0 : 'auto'}
                maxWidth={{ xs: '100%', sm: '80%', md: '70%' }}
              >
                <Typography variant='subtitle2' fontWeight='bold'>
                  {msg.footnote.title}:
                </Typography>
                {msg.footnote.title === 'Generated SQL' ? (
                  <SyntaxHighlighter language='sql' style={tomorrow} wrapLongLines={true}>
                    {msg.footnote.content}
                  </SyntaxHighlighter>
                ) : (
                  <Box display='flex' flexWrap='wrap' gap={0.5}>
                    {msg.footnote.content.map((doc, docIndex) => (
                      <Box key={docIndex} display='inline'>
                        <Link href={doc.gcs_link || '#'} target='_blank' rel='noopener noreferrer' color='inherit'>
                          {doc.metadata && doc.metadata.source
                            ? doc.metadata.source.split('/').pop()
                            : `Document ${docIndex + 1}`}
                        </Link>
                        {docIndex < msg.footnote.content.length - 1 && ', '}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {msg.type === 'user' && <Box width={40} height={40} />}
        </Box>
      ))}

      {isLoading && (
        <Box display='flex' alignItems='center' justifyContent='flex-start' gap={1} p={2}>
          <TypingDots />
          <CircularProgress size={20} color='secondary' />
          <Typography variant='body2' color='textSecondary'>
            Querying...
          </Typography>
        </Box>
      )}
    </Box>
  )
}
