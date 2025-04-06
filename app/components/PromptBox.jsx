import React, { useState, useRef, useEffect } from 'react'
import { Box, IconButton, InputBase, Typography } from '@mui/material'
import ProIcon from '@mui/icons-material/StarBorder' // Example icon
import FollowUpIcon from '@mui/icons-material/ChatBubbleOutline' // Example icon
import AttachmentIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'
import { useTheme } from '@mui/material/styles'
import { useAppContext } from '../contexts/AppContext'
import ModelMenu from './ModelMenu'

const MAX_QUERY_LENGTH = 3

const variantBackgroundColor = {
  filled: 'primary.main',
}

const variantColor = {
  filled: 'white',
}

function MyIconButton({ variant, ...other }) {
  return (
    <IconButton
      sx={{
        backgroundColor: variantBackgroundColor[variant],
        color: variantColor[variant],
        '&:hover': { backgroundColor: variantBackgroundColor[variant] },
      }}
      {...other}
    />
  )
}

function InputComponent() {
  const [query, setQuery] = useState('')

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

  const handleInputChange = (value) => {
    setQuery(value)
    console.log(value.length)
    if (value.length > MAX_QUERY_LENGTH) {
      setIsMultiline(true)
    } else {
      setIsMultiline(false)
    }
  }

  const handleAPIMenuChange = (apiKey) => {
    setSelectedAPI(apiKey)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMultiline ? 'column-reverse' : 'row',
        alignItems: isMultiline ? 'flex-start' : 'center',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: isMultiline ? '100%' : 'auto' }}>
        <IconButton size='small'>
          <AttachmentIcon />
        </IconButton>
        <ModelMenu onAPIChange={handleAPIMenuChange} />
        <Box sx={{ flexGrow: 1 }} />
        <MyIconButton
          size='small'
          variant='filled'
          color='secondary'
          sx={{ ml: theme.spacing(1), display: isMultiline ? 'inherit' : 'none' }}
        >
          <SendIcon />
        </MyIconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <InputBase
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          inputRef={inputRef}
          placeholder='Type your query...'
          inputProps={{ 'aria-label': 'input message' }}
          onChange={(e) => handleInputChange(e.target.value)}
          sx={{
            ml: theme.spacing(1),
            mb: isMultiline ? theme.spacing(1) : 0,
          }}
        />

        <MyIconButton size='small' variant='filled' color='secondary'>
          <SendIcon />
        </MyIconButton>
      </Box>
    </Box>
  )
}

export default InputComponent
