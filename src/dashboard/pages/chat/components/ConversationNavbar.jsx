import { Avatar, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import './chatsStyles.css'

const ConversationNavbar = () => {
  return (
    <Grid container>
    <Card className='navbar_chat'>
    <Grid item className='navbar_content'>
    <Avatar alt='user_photo' src={ ''} />
    <Typography sx={{m:1}}>
    josue rocha
    </Typography>
    </Grid>
    </Card>
  </Grid>
  )
}

export default ConversationNavbar