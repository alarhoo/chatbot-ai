// components/APIMenu.jsx
'use client'
import * as React from 'react'
import { Button, Menu, MenuItem, Tooltip, useMediaQuery } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import { useAppContext } from '../contexts/AppContext'
import { useTheme } from '@mui/material/styles'

export default function APIMenu({ onAPIChange }) {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const currentColor = isDarkMode ? '#414141' : '#e5e5e5'
  const textColor = isDarkMode ? '#c1c1c1' : '#585858'
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { selectedAPI, setSelectedAPI } = useAppContext() // Use the context
  const isMobile = useMediaQuery('(max-width:600px)')

  console.log('onAPIChange:', onAPIChange)
  // API options with endpoints
  const apiOptions = [
    { key: 'getdatafromsql', label: 'Big Query', icon: <QueryStatsIcon fontSize='small' color='action' /> },
    { key: 'getdatafrompdf', label: 'PDF Docs', icon: <FolderCopyIcon fontSize='small' color='action' /> },
    { key: 'getdatafromimage', label: 'Image Query', icon: <ImageSearchIcon fontSize='small' color='action' /> },
  ]

  // Default selected API
  // const [selectedApi, setSelectedApi] = React.useState(apiOptions[1]) // PDF Docs by default

  const selectedApiObj = apiOptions.find((option) => option.key === selectedAPI) // Find selected API

  const handleMenuItemClick = (option) => {
    setSelectedAPI(option.key)
    setAnchorEl(null)
    // onAPIChange(option.key) // Pass the selected API endpoint to the parent component
  }

  return (
    <div>
      <Button
        id='apimenu-button'
        variant='text'
        size='small'
        sx={{
          borderRadius: '50px',
          padding: '4px 10px',
          backgroundColor: currentColor,
          color: textColor,
          width: 'max-content',
        }}
        aria-controls={open ? 'api-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={selectedApiObj.icon}
      >
        {isMobile ? 's' : selectedApiObj.label}
      </Button>
      <Tooltip title='Choose a model' arrow>
        <Menu
          id='api-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'apimenu-button',
          }}
        >
          {apiOptions.map((option) => (
            <MenuItem
              key={option.key}
              onClick={() => handleMenuItemClick(option)}
              selected={selectedApiObj.key === option.key}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Tooltip>
    </div>
  )
}
