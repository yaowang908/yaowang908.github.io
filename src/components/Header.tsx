import { useEffect } from 'react'
import Typography from '@mui/material/Typography'

const Header = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <Typography
      align='center'
      variant='h2'
      sx={{ marginLeft: '0.2em', flexGrow: '0' }}
    >
      {title}
    </Typography>
  )
}

export default Header
