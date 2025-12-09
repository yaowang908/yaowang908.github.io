import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Layout from '../components/Layout'
import NavMenu from '../components/NavMenu'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Layout>
      <NavMenu />
      <Box sx={{ flexGrow: '1', display: 'grid', placeItems: 'center left' }}>
        <div>
          <Typography
            align='left'
            noWrap
            variant='h1'
            sx={{
              marginTop: '-6vh',
            }}
          >
            Hello
          </Typography>
          <Typography align='left' variant='h2' sx={{ marginLeft: '0.2em' }}>
            I&apos;m Yao Wang.
          </Typography>
          <Typography align='left' variant='h2' sx={{ marginLeft: '0.2em' }}>
            I build things for the web.
          </Typography>
        </div>
      </Box>
    </Layout>
  )
}

