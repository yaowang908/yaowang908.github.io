import { createRootRoute, Outlet } from '@tanstack/react-router'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import createEmotionCache from '../lib/createEmotionCache'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#080a0f', paper: '#10141c' },
    text: { primary: '#f2f4f8', secondary: '#929cab' },
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
