'use client'
import { useState } from 'react'
import { TextField, IconButton, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'
import ImageIcon from '@mui/icons-material/Image'
import ChatIcon from '@mui/icons-material/Chat'
import Image from 'next/image'
import { useAppContext } from '../contexts/AppContext'
import APIMenu from './APIMenu'

export default function QueryBox({ onSend, isLoading, onNewChat }) {
  const [query, setQuery] = useState('')
  const [image, setImage] = useState(null)
  const { setSelectedAPI, chatNavigation, setChatNavigation } = useAppContext()

  const handleSend = () => {
    if (query.trim() || image) {
      onSend(query, image)
      setQuery('')
      setImage(null)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      setSelectedAPI('getdatafromimage')
      reader.readAsDataURL(file)
    }
  }

  const handleNewChat = () => {
    const newChat = {
      segment: `chat-${Date.now()}`, // Unique ID
      title: `Chat ${chatNavigation.length + 1}`,
      icon: <ChatIcon />,
    }

    setChatNavigation([...chatNavigation, newChat])
  }

  const handleAPIMenuChange = (apiKey) => {
    setSelectedAPI(apiKey)
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={1}
      p={1}
      borderRadius={2}
      boxShadow={1}
      position='sticky'
      bottom={0}
      width='100%'
      bgcolor='white'
    >
      <Box display='flex' alignItems='center' gap={1} width='100%'>
        <TextField
          fullWidth
          multiline
          maxRows={8}
          variant='standard'
          placeholder='Type your query...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{ disableUnderline: true }}
          sx={{ flex: 1 }}
        />
        {isLoading ? (
          <Button loading>loading...</Button>
        ) : (
          <IconButton onClick={handleSend} color='primary' disabled={isLoading || !query.trim()}>
            <SendIcon />
          </IconButton>
        )}
      </Box>

      <Box display='flex' alignItems='center' gap={2} width='100%'>
        <Button onClick={onNewChat} variant='outlined' startIcon={<AddIcon />} disabled={isLoading}>
          New Chat
        </Button>

        <input
          accept='image/*'
          type='file'
          id='image-upload'
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor='image-upload'>
          <Button component='span' variant='outlined' startIcon={<ImageIcon />} disabled={isLoading}>
            Attach Image
          </Button>
        </label>

        <APIMenu onAPIChange={handleAPIMenuChange} />
      </Box>
    </Box>
  )
}
