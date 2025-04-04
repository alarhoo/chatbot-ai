import React, { useState } from 'react'
import { Box, InputBase, IconButton, Typography, Paper, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'

const BodyPaper = styled(Paper)(({ theme, isSearchActive }) => ({
  position: 'relative', // Needed for absolute positioning of children if any
  maxWidth: 600, // Example max width
  margin: theme.spacing(4, 'auto'),
  padding: theme.spacing(3),
  textAlign: 'center',
  opacity: isSearchActive ? 0.5 : 1,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
}))

const SearchBoxWrapper = styled(Box)(({ theme, isFooter }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: isFooter ? 0 : 'auto',
  top: isFooter ? 'auto' : '50%',
  transform: isFooter ? 'translateY(0)' : 'translateY(-50%)',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  zIndex: 1200,
  transition: theme.transitions.create(['top', 'bottom', 'transform'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  ...(isFooter && {
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  ...(!isFooter && {
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2),
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
}))

const HeaderWrapper = styled(Box)(({ theme, show }) => ({
  position: 'fixed',
  top: show ? 0 : '-100%',
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  zIndex: 1100,
  opacity: show ? 1 : 0,
  transition: theme.transitions.create(['top', 'opacity'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

function AnimatedSearch() {
  const [query, setQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setIsSearchActive(true)

    // Simulate search completion for demonstration
    setTimeout(() => {
      // In a real application, you might update state with search results here
    }, 2000)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <HeaderWrapper show={isSearchActive}>
        <Typography variant='h6'>Search Results</Typography>
        {/* You can add back button or other header elements here */}
      </HeaderWrapper>

      <BodyPaper elevation={3} isSearchActive={isSearchActive}>
        <Typography variant='h4' gutterBottom>
          How can I help you today?
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          This code will display a prompt asking the user for their name, and then it will display a greeting message
          with the name entered by the user.
        </Typography>
        <Box mt={3} display='flex' justifyContent='space-around'>
          <Box bgcolor='grey.200' p={2} borderRadius={1}>
            Saved Prompt Templates
          </Box>
          <Box bgcolor='grey.200' p={2} borderRadius={1}>
            Media Type Selection
          </Box>
          <Box bgcolor='grey.200' p={2} borderRadius={1}>
            Multilingual Support
          </Box>
        </Box>
        {/* More content can be added here */}
      </BodyPaper>

      <SearchBoxWrapper isFooter={isSearchActive}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <InputBase
            placeholder='Type your prompt here...'
            fullWidth
            value={query}
            onChange={handleInputChange}
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type='submit' color='primary' aria-label='search'>
            <SearchIcon />
          </IconButton>
          {query && (
            <IconButton type='submit' color='secondary' aria-label='send'>
              <SendIcon />
            </IconButton>
          )}
        </form>
      </SearchBoxWrapper>
    </Box>
  )
}

export default AnimatedSearch
