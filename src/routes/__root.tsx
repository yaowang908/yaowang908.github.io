import { createRootRoute, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { PaletteMode, CssBaseline } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CacheProvider } from '@emotion/react'
import { getDesignTokens } from '../lib/theme'
import { ColorModeContext } from '../lib/ColorModeContext'
import createEmotionCache from '../lib/createEmotionCache'

import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

const constant = {
  isDarkModeEnabledKey: 'is-dark-mode-enabled',
}

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<PaletteMode>('light')

  React.useEffect(() => {
    const previousMode = localStorage.getItem(constant.isDarkModeEnabledKey)
    if (previousMode === 'light' || previousMode === 'dark') {
      setMode(previousMode)
    } else {
      setMode(prefersDarkMode ? 'dark' : 'light')
    }
  }, [prefersDarkMode])

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const nextMode = prevMode === 'light' ? 'dark' : 'light'
          localStorage.setItem(constant.isDarkModeEnabledKey, nextMode)
          return nextMode
        })
      },
    }),
    []
  )

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Outlet />
          {/* <TanStackRouterDevtools /> */}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  )
}

