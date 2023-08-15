import { Avatar, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import './chatsStyles.css'
import { useParams } from 'react-router-dom';

const ConversationNavbar = ({user}) => {
  const {id,prefix} = useParams();
  return (
    <Grid  sx={{position:'sticky'}}>
    <Card className='navbar_chat'>
    <Avatar alt='user_photo' src={ ''} />
    <Typography sx={{m:1}}>
    {prefix !== 'null' ? prefix : id}
    </Typography>

    </Card>
  </Grid>
  )
}

export default ConversationNavbar