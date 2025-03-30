'use client'
import { createTheme } from '@mui/material/styles'

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: false },
//   colorSchemeSelector: 'class',
//   breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
// })

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: false },
  palette: {
    mode: 'light',
    primary: {
      main: '#0099dc',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fdf8f9',
    },
  },
})

export default theme
