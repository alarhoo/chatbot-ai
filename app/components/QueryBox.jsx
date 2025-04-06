'use client'
import { useState } from 'react'
import { TextField, IconButton, Box, Button, Paper, Popover, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'
import ImageIcon from '@mui/icons-material/Image'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import { useAppContext } from '../contexts/AppContext'
import APIMenu from './APIMenu'

export default function QueryBox({ onSend, isLoading, onNewChat }) {
  const [query, setQuery] = useState('')
  const [image, setImage] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const { setSelectedAPI, chatNavigation, setChatNavigation } = useAppContext()
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleSend = () => {
    if (query.trim() || image) {
      onSend(query, image)
      setQuery('')
      setImage(null)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
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

  const handleImageClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const handleRemoveImage = () => {
    setImage(null)
  }

  const handleNewChat = () => {
    const newChat = {
      segment: `chat-${Date.now()}`,
      title: `Chat ${chatNavigation.length + 1}`,
      icon: <ChatIcon />,
    }
    setChatNavigation([...chatNavigation, newChat])
  }

  const handleAPIMenuChange = (apiKey) => {
    setSelectedAPI(apiKey)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 1,
        borderRadius: 2,
      }}
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
          <Button loading>Loading...</Button>
        ) : (
          <IconButton onClick={handleSend} color='primary' disabled={!query.trim()}>
            <SendIcon />
          </IconButton>
        )}
      </Box>

      {image && (
        <Box
          sx={{
            width: 60,
            height: 60,
            position: 'relative',
            borderRadius: 1,
            overflow: 'hidden',
            cursor: 'pointer',
            border: '1px solid #ddd',
          }}
          onClick={handleImageClick}
        >
          <Image src={image} alt='Reference' layout='fill' objectFit='cover' />
          <IconButton
            size='small'
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              borderRadius: '50%',
              p: 0.5,
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveImage()
            }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      )}

      <Box display='flex' alignItems='center' gap={2} width='100%'>
        <Button
          size='small'
          onClick={onNewChat}
          variant='outlined'
          startIcon={<AddIcon />}
          disabled={isLoading}
          sx={{ fontWeight: 'bold', textTransform: 'none' }}
        >
          {!isMobile && 'New Chat'}
        </Button>

        <input
          accept='image/*'
          type='file'
          id='image-upload'
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor='image-upload'>
          <Button
            size='small'
            component='span'
            variant='contained'
            startIcon={<ImageIcon />}
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            {!isMobile && 'Attach Image'}
          </Button>
        </label>

        <APIMenu onAPIChange={handleAPIMenuChange} />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        {image && (
          <Box p={2}>
            <Image src={image} alt='Preview' width={400} height={400} />
          </Box>
        )}
      </Popover>
    </Paper>
  )
}
