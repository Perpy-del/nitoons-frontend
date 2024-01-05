import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/ui/theme'
import { StoreProvider } from 'easy-peasy';
import { NitoonsStore } from '../store/NitoonsStore'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={NitoonsStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}
