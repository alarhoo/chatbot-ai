// components/APIMenu.jsx
'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import { useAppContext } from '../contexts/AppContext'

export default function APIMenu({ onAPIChange }) {
  const [alignment, setAlignment] = React.useState('pdf')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { selectedAPI, setSelectedAPI } = useAppContext() // Use the context

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
    setSelectedAPI(newAlignment)
  }

  // API options with endpoints
  const apiOptions = [
    { key: 'getdatafrombigquery', label: 'Big Query', icon: <QueryStatsIcon fontSize='small' /> },
    { key: 'getdatafrompdf', label: 'PDF Docs', icon: <PictureAsPdfIcon fontSize='small' /> },
  ]

  // Default selected API
  // const [selectedApi, setSelectedApi] = React.useState(apiOptions[1]) // PDF Docs by default

  const selectedApiObj = apiOptions.find((option) => option.key === selectedAPI) // Find selected API

  const handleMenuItemClick = (option) => {
    debugger
    setSelectedAPI(option.key)
    setAnchorEl(null)
  }

  return (
    <div>
      {/* <Button
        id='apimenu-button'
        aria-controls={open ? 'api-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        API: {selectedApiObj.label}
      </Button>
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
      </Menu> */}
      <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label='text alignment'>
        <ToggleButton value='getdatafrompdf' aria-label='PDF'>
          <PictureAsPdfIcon />
        </ToggleButton>
        <ToggleButton value='getdatafrombigquery' aria-label='Big Query'>
          <QueryStatsIcon />
        </ToggleButton>
        <ToggleButton value='getdatafromimage' aria-label='Image Query'>
          <ImageSearchIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
