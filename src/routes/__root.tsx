import { createRootRoute, Outlet } from '@tanstack/react-router'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import createEmotionCache from '../lib/createEmotionCache'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()
const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#faf9f6', paper: '#ffffff' },
    text: { primary: '#263238', secondary: '#65717b' },
  },
  typography: { fontFamily: '"Inter", sans-serif' },
})

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </CacheProvider>
  )
}
