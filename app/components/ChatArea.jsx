'use client'
import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Paper,
  Link,
  Typography,
  useTheme,
  Popover,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material'
import Image from 'next/image'
import ReplayIcon from '@mui/icons-material/Replay'
import botImage from '../public/img/boltz.png'
import AnimatedText from './AnimatedText'
import TypingDots from './TypingDots'
import { useAppContext } from '../contexts/AppContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { atelierForestDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatArea({ messages, isLoading, onRetry }) {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const syntaxStyle = isDarkMode ? atelierForestDark : atelierForestLight

  const { selectedAPI, setSelectedAPI } = useAppContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const [popoverContent, setPopoverContent] = useState([])

  const getGlowStyle = (apiKey) => ({
    border: selectedAPI === apiKey ? '2px solid' : 'none',
    borderColor: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  })

  const handlePaperClick = (apiKey) => {
    setSelectedAPI(apiKey)
  }

  const handleMoreClick = (event, content) => {
    setAnchorEl(event.currentTarget)
    setPopoverContent(content)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setPopoverContent([])
  }

  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined

  const handleRetryClick = (message) => {
    if (onRetry) {
      onRetry()
    }
  }

  return (
    <Box flex={1} display='flex' flexDirection='column' gap={1} p={1} height='100%' mb={5} sx={{ overflowY: 'auto' }}>
      <Paper elevation={5} sx={{ p: 2, mb: 4, borderRadius: 2, width: '100%' }} className='animate__bounceIn'>
        <Typography variant='h1' className='gradient-text' textAlign='center'>
          Welcome to our AI-powered assistant!
        </Typography>
        <Typography textAlign='center' mb={2}>
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
            <Typography fontWeight='bold'>Get Data from PDF</Typography>
            <Typography variant='body2'>Extract structured data from PDF documents efficiently.</Typography>
          </Paper>
          <Paper
            sx={{ p: 2, width: '30%', textAlign: 'center', cursor: 'pointer', ...getGlowStyle('getdatafromsql') }}
            onClick={() => handlePaperClick('getdatafromsql')}
          >
            <Typography fontWeight='bold'>Get Data from BigQuery</Typography>
            <Typography variant='body2'>Fetch and analyze large datasets from Google BigQuery.</Typography>
          </Paper>
          <Paper
            sx={{ p: 2, width: '30%', textAlign: 'center', cursor: 'pointer', ...getGlowStyle('getdatafromimage') }}
            onClick={() => handlePaperClick('getdatafromimage')}
          >
            <Typography fontWeight='bold'>Get Data from Image</Typography>
            <Typography variant='body2'>Extract text and information from images using OCR.</Typography>
          </Paper>
        </Box>
      </Paper>

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
          <Box flex={1} display='flex' flexDirection={msg.type === 'error' ? 'row' : 'column'} gap={1}>
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
              {msg.text && msg.type === 'bot' ? (
                <AnimatedText text={msg.text} />
              ) : (
                msg.text && <Typography style={{ whiteSpace: 'pre-line' }}>{msg.text.replace(/\\n/g, '\n')}</Typography>
              )}
            </Paper>
            {msg.type === 'error' && (
              <IconButton onClick={() => handleRetryClick(msg)} aria-label='retry'>
                <ReplayIcon color='error' />
              </IconButton>
            )}
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
                  <SyntaxHighlighter language='sql' style={syntaxStyle} wrapLongLines={true}>
                    {msg.footnote.content}
                  </SyntaxHighlighter>
                ) : msg.footnote.title === 'Source Documents' ? (
                  <Box display='flex' flexWrap='wrap' gap={0.5} alignItems='center'>
                    {msg.footnote.content.slice(0, 3).map((doc, docIndex) => (
                      <Box key={docIndex} display='inline'>
                        <Link href={doc.gcs_link || '#'} target='_blank' rel='noopener noreferrer' color='inherit'>
                          {doc.metadata && doc.metadata.source
                            ? doc.metadata.source.split('/').pop()
                            : `Document ${docIndex + 1}`}
                        </Link>
                        {docIndex < Math.min(3, msg.footnote.content.length) - 1 && ', '}
                      </Box>
                    ))}
                    {msg.footnote.content.length > 3 && (
                      <Link
                        sx={{ cursor: 'pointer', marginLeft: 1 }}
                        onClick={(event) => handleMoreClick(event, msg.footnote.content)}
                      >
                        More
                      </Link>
                    )}
                  </Box>
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
        </Box>
      ))}

      {/* Loading Indicator */}
      {isLoading && (
        <Box display='flex' alignItems='center' justifyContent='flex-start' gap={1} p={2}>
          <TypingDots />
        </Box>
      )}

      {/* Popover for More Sources */}
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <List sx={{ p: 2 }}>
          {popoverContent.map((doc, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={
                  <Link href={doc.gcs_link || '#'} target='_blank' rel='noopener noreferrer' color='inherit'>
                    {doc.metadata && doc.metadata.source
                      ? doc.metadata.source.split('/').pop()
                      : `Document ${index + 1}`}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  )
}
