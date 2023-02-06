import { Box, Typography } from '@mui/material'
import React from 'react'
import Personal from '../components/Personal/Personal'

export default function Dashboard({children}) {
  return (
   <Personal>
     <Box sx={{padding:'2rem 4rem'}}>
        <Typography
        variant='h4'
        >
          My Courses
        </Typography>
        <Box
        border='0.1em solid var(--light)'
        width='50%'
        marginTop='1em'>
        {children}
        </Box>
    </Box>
   </Personal>
  )
}
