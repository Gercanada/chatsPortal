import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { BoxComments } from './BoxComments'

const CommentsComponent = () => {
  return (
    <Grid container  xs= {12} md={12} spacing={1} sx={{marginTop: '10px'}}>
      <Grid cotainer item md={12} xs={12}>
      <Card sx={{marginBottom: '20px'}}>
         <Box  sx={{height: '600px', display:"flex", justifyContent:"center"}} >
         <Grid item xs={12} md={12}>
         <BoxComments />
         </Grid>
         </Box>
      </Card>
      </Grid>
    </Grid>
  )
}

export default CommentsComponent
