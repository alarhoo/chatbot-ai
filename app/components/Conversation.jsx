'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, Tabs, Tab, Skeleton, Divider } from '@mui/material'
import Link from '@mui/material/Link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { srcery } from 'react-syntax-highlighter/dist/esm/styles/prism'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`conversation-tabpanel-${index}`}
      aria-labelledby={`conversation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `conversation-tab-${index}`,
    'aria-controls': `conversation-tabpanel-${index}`,
  }
}

function AnimatedText({ text }) {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (text && index < text.length) {
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, 20) // Adjust typing speed here
      return () => clearInterval(intervalRef.current)
    } else if (index >= text.length) {
      clearInterval(intervalRef.current)
    }
  }, [text, index])

  return <Typography style={{ whiteSpace: 'pre-line' }}>{displayText.replace(/\\n/g, '\n')}</Typography>
}

export default function Conversation({ question, response, footnote, isLoading }) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box mb={2}>
      <Typography variant='h6' fontWeight='bold' mb={1}>
        {question}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='conversation tabs'>
          <Tab label='Answer' {...a11yProps(0)} />
          <Tab label='Source' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {isLoading ? (
          <Skeleton variant='rectangular' height={100} />
        ) : response ? (
          <AnimatedText text={response} />
        ) : (
          <Typography color='textSecondary'>No answer yet.</Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {footnote ? (
          footnote.title === 'Generated SQL' ? (
            <SyntaxHighlighter language='sql' style={srcery} wrapLongLines={true}>
              {footnote.content}
            </SyntaxHighlighter>
          ) : (
            <Box display='flex' flexDirection='column' gap={0.5}>
              {footnote.content.map((doc, docIndex) => (
                <Link key={docIndex} href={doc.gcs_link || '#'} target='_blank' rel='noopener noreferrer'>
                  {doc.metadata && doc.metadata.source
                    ? doc.metadata.source.split('/').pop()
                    : `Document ${docIndex + 1}`}
                </Link>
              ))}
            </Box>
          )
        ) : (
          <Typography color='textSecondary'>No source information.</Typography>
        )}
      </TabPanel>
      <Divider sx={{ mt: 2 }} />
    </Box>
  )
}
