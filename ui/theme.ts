import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'Clash Grotesk, sans-serif',
  },
  palette: {
    primary: {
      main: '#D90368',
    },
    secondary: {
      main: '#FFE1EF',
    },
    error: {
      main: '#EB5757',
    },
    success: {
      main: '#4CAF50',
    },
    text: {
      primary: '#101010',
      secondary: '#020202',
      disabled: '#353538rgba(255, 255, 255, 0.26)',
    },
    action: {
      active: '#D90368',
      // 'linear-gradient(90deg, #820263 0%, #D90368 38.02%, #FFD400 75.83%, #D90368 100%)'
      disabled: '#fff',
      disabledBackground: 'rgba(255, 255, 255, 0.26);',
    },
  },
})
