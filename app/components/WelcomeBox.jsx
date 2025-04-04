import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import PromptBox from './PromptBox'
import 'animate.css'

const WelcomeBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
      }}
    >
      <Paper
        elevation={5}
        sx={{ p: 2, mb: 2, borderRadius: 2, width: { xs: '100%', sm: '100%', md: '75%' }, maxWidth: '90%' }}
        className='animate__bounceIn'
      >
        <Typography variant='h4' className='gradient-text' textAlign='center' gutterBottom>
          Welcome to our AI-powered assistant!
        </Typography>
        <Typography textAlign='center' mb={2} color='text.secondary'>
          I can help you retrieve data from PDFs, BigQuery, and Images. Please select an option from the menu in query
          box.
        </Typography>
        <Box
          display='flex'
          gap={2}
          justifyContent='center'
          sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
          mb={2}
        >
          <Paper sx={{ p: 2, width: '30%', textAlign: 'center' }} elevation={2}>
            <Typography fontWeight='bold'>Get Data from PDF</Typography>
            <Typography variant='body2' color='text.secondary'>
              Extract structured data from PDF documents efficiently.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, width: '30%', textAlign: 'center' }} elevation={2}>
            <Typography fontWeight='bold'>Get Data from BigQuery</Typography>
            <Typography variant='body2' color='text.secondary'>
              Fetch and analyze large datasets from Google BigQuery.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, width: '30%', textAlign: 'center' }} elevation={2}>
            <Typography fontWeight='bold'>Get Data from Image</Typography>
            <Typography variant='body2' color='text.secondary'>
              Extract text and information from images using OCR.
            </Typography>
          </Paper>
        </Box>

        <Box mt={8}>
          <PromptBox />
        </Box>
      </Paper>
    </Box>
  )
}

export default WelcomeBox
