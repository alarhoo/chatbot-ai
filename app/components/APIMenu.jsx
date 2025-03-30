// components/APIMenu.jsx
'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ToggleButton from '@mui/material/ToggleButton'
import Tooltip from '@mui/material/Tooltip'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import { useAppContext } from '../contexts/AppContext'

export default function APIMenu({ onAPIChange }) {
  const [menu, setMenu] = React.useState('getdatafrompdf')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { selectedAPI, setSelectedAPI } = useAppContext()

  const handleApiMenu = (event, newMenu) => {
    setMenu(newMenu)
    setSelectedAPI(newMenu)
  }

  const handleMenuItemClick = (option) => {
    debugger
    setSelectedAPI(option.key)
    setAnchorEl(null)
  }

  return (
    <div>
      <ToggleButtonGroup value={menu} exclusive onChange={handleApiMenu} size='small' aria-label='api menu'>
        <Tooltip title='get data from pdf' arrow>
          <ToggleButton value='getdatafrompdf' aria-label='PDF'>
            <PictureAsPdfIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title='get data from sql' arrow>
          <ToggleButton value='getdatafromsql' aria-label='Big Query'>
            <QueryStatsIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title='get data from image' arrow>
          <ToggleButton value='getdatafromimage' aria-label='Image Query'>
            <ImageSearchIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  )
}
