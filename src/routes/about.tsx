import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'

import Layout from '../components/Layout'
import Header from '../components/Header'
import NavMenu from '../components/NavMenu'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Layout>
      <NavMenu />
      <Header title='About me' />
      <Box sx={{ flexGrow: '1' }}>{/* content */}</Box>
    </Layout>
  )
}

