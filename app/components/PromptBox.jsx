import React, { useState, useRef, useEffect } from 'react'
import { Box, IconButton, InputBase, Typography } from '@mui/material'
import ProIcon from '@mui/icons-material/StarBorder' // Example icon
import FollowUpIcon from '@mui/icons-material/ChatBubbleOutline' // Example icon
import AttachmentIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/ArrowUpward'
import { useTheme } from '@mui/material/styles'
import { useAppContext } from '../contexts/AppContext'
import ModelMenu from './ModelMenu'

function InputComponent() {
  const theme = useTheme()
  const inputRef = useRef(null)
  const [isMultiline, setIsMultiline] = useState(false)

  const { setSelectedAPI, chatNavigation, setChatNavigation } = useAppContext()

  useEffect(() => {
    const checkMultiline = () => {
      if (inputRef.current) {
        setIsMultiline(inputRef.current.offsetHeight > theme.spacing(3)) // Adjust threshold as needed
      }
    }

    if (inputRef.current) {
      checkMultiline()
    }
  }, [theme])

  const handleInputChange = () => {
    if (inputRef.current) {
      // Force a re-check after input changes
      setTimeout(() => {
        setIsMultiline(inputRef.current.offsetHeight > theme.spacing(3)) // Adjust threshold
      }, 0)
    }
  }

  const handleAPIMenuChange = (apiKey) => {
    setSelectedAPI(apiKey)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMultiline ? 'column' : 'row',
        alignItems: isMultiline ? 'flex-start' : 'center',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <IconButton size='small'>
        <AttachmentIcon />
      </IconButton>

      <ModelMenu onAPIChange={handleAPIMenuChange} />

      <InputBase
        inputRef={inputRef}
        placeholder='Type your message...'
        inputProps={{ 'aria-label': 'input message' }}
        multiline
        minRows={1}
        maxRows={4}
        onChange={handleInputChange}
        sx={{
          ml: theme.spacing(1),
          flexGrow: 1,
          mb: isMultiline ? theme.spacing(1) : 0,
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: isMultiline ? 'row' : 'column', alignItems: 'center' }} color='primary'>
        <IconButton size='small' sx={{ ml: theme.spacing(1) }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default InputComponent
