import { Card, Grid, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React from 'react'

const MessagesField = () => {
  return (
<Grid>
  <Card sx={{ justifyContent:'space-around', display:'flex' }}>
  <IconButton aria-label="delete" size="large">
  <AttachFileIcon />
</IconButton>
  <TextField
     sx={{ m: 1, width: '80%'}}
    variant="outlined"
  />
  <IconButton aria-label="delete" size="large" color='success'>
  <SendIcon />
</IconButton>
  </Card>
</Grid>
  )
}

export default MessagesField