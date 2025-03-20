'use client'
import * as React from 'react'
import { Typography } from '@mui/material'

function SidebarFooter({ mini }) {
  return (
    <Typography variant='caption' sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {mini ? '© Blz' : `© ${new Date().getFullYear()} Bulerez`}
    </Typography>
  )
}

export default SidebarFooter
