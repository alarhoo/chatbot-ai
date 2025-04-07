'use client'
import { useState } from 'react'
import * as React from 'react'
import { Stack, Typography, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp'
import APIMenu from './APIMenu'
import Image from 'next/image'
import logo from '../public/img/logo.png'
import logoDark from '../public/img/logo-dark.png'
import botImage from '../public/img/bolt.png'

function CustomAppTitle() {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const currentLogo = isDarkMode ? botImage : botImage

  const [selectedAPI, setSelectedAPI] = useState('getdatafrompdf')

  const handleAPIMenuChange = (apiKey) => {
    setSelectedAPI(apiKey)
  }

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      {/* <SmartToySharpIcon fontSize='small' color='primary' /> */}
      <Image src={currentLogo} alt='Logo' width={30} height={30} />
      <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: 'x-large', marginTop: '5px !important' }}>
        Bolt
      </Typography>
      {/* <Chip size='small' label='BETA' color='info' /> */}
      {/* <APIMenu onAPIChange={handleAPIMenuChange} /> */}
    </Stack>
  )
}

export default CustomAppTitle
