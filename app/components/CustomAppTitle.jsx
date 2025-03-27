'use client'
import { useState } from 'react'
import * as React from 'react'
import { Stack, Typography, Chip } from '@mui/material'
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp'
import APIMenu from './APIMenu'

function CustomAppTitle() {
  const [selectedAPI, setSelectedAPI] = useState('getdatafrompdf')

  const handleAPIMenuChange = (apiKey) => {
    setSelectedAPI(apiKey)
  }

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <SmartToySharpIcon fontSize='small' color='primary' />
      {/* <Typography variant='h6'>Bulerez Chatbot</Typography> */}
      <Chip size='small' label='BETA' color='info' />
      <APIMenu onAPIChange={handleAPIMenuChange} />
    </Stack>
  )
}

export default CustomAppTitle
