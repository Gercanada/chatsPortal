import { Avatar, Card, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import './chatsStyles.css'
import { useParams } from 'react-router-dom';
import PopoverField from '../../../../components/Popovers/PopoverField';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFiles } from '../../../../store/slices/whatsApp/thunks';

const ConversationNavbar = ({user}) => {
  const {id,thread,prefix} = useParams();
  const dispatch = useDispatch()
  const {userFiles} = useSelector((state) => state.whatsApp);

useEffect(() => {
  dispatch(getUserFiles(thread));
}, [id])

  return (
    <Grid  sx={{position:'sticky'}}>
    <Card className='navbar_chat'>
    <Avatar alt='user_photo' src={ ''} />
    <Typography sx={{m:1}}>
    {prefix !== 'null' ? prefix : id}
    </Typography>
    {/* <Grid sx={{m:1}}>
    <PopoverField values={userFiles && userFiles} title={'files'} type={'files'} />
    </Grid> */}
    </Card>
  </Grid>
  )
}

export default ConversationNavbar