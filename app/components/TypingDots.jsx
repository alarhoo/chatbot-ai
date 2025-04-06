'use client'
import React from 'react'
import { Box, Typography } from '@mui/material'
import { keyframes } from '@mui/system'
import { styled } from '@mui/material/styles'

const blink = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`

const Dot = styled(Typography)(({ theme }) => ({
  fontSize: '1.5em',
  fontWeight: 'bold',
  lineHeight: '1em',
  marginRight: theme.spacing(1),
  '&:nth-child(1)': {
    animation: `${blink} 1s infinite`,
  },
  '&:nth-child(2)': {
    animation: `${blink} 1s infinite 0.33s`,
  },
  '&:nth-child(3)': {
    animation: `${blink} 1s infinite 0.66s`,
  },
}))

function TypingDots() {
  return (
    <Box display='flex' alignItems='center'>
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </Box>
  )
}

export default TypingDots
