'use client'
import { useState } from 'react'
import { TextField, IconButton, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

export default function QueryBox({ onSend, isLoading }) {
  const [query, setQuery] = useState('')

  const handleSend = () => {
    if (query.trim() && !isLoading) {
      onSend(query)
      setQuery('')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSend()
    }
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      gap={1}
      p={1}
      borderRadius={2}
      boxShadow={1}
      bgcolor='#262f37'
      position='sticky'
      bottom={0}
      width='100%'
    >
      <TextField
        fullWidth
        variant='standard'
        placeholder={isLoading ? 'Querying...' : 'Type your query...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          style: { backgroundColor: '#262f37', color: 'white' },
          readOnly: isLoading,
          disableUnderline: true,
        }}
      />
      <IconButton onClick={handleSend} color='primary' disabled={isLoading}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}
