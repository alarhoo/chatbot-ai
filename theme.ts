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
  colorSchemes: { light: true, dark: true },
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
    spacing: 4, // Adjust spacing scale for compact design
    typography: {
      fontSize: 12, // Reduce default font size
      h1: { fontSize: '1.5rem' },
      h2: { fontSize: '1.25rem' },
      body1: { fontSize: '0.875rem' },
    },
  },
})

export default theme
