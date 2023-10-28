import { Avatar, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './chatsStyles.css'
import { useParams } from 'react-router-dom';
import PopoverField from '../../../../components/Popovers/PopoverField';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFiles, updateContactNameThread } from '../../../../store/slices/whatsApp/thunks';
import ModalForm from '../../../../components/Modal/ModalForm';
import ModalField from '../../../../components/Modal/ModalField';

const ConversationNavbar = ({user}) => {
  const {id,thread} = useParams();
  const dispatch = useDispatch()
  const {userFiles} = useSelector((state) => state.whatsApp);
  const [openModal, setOpenModal] = useState(false);

useEffect(() => {
  dispatch(getUserFiles(thread));
}, [id])

const details = [
  { name_: 'Nombre', key: 'name', allowEdit: false, type: 'text', value: '' },
];
const onClose = () => {
  setOpenModal(false);
};

const onSubmitCreateContact = async (formDataParam) => {
  console.log('formDataParam',formDataParam);
  console.log('thread',thread);

  dispatch(updateContactNameThread(thread,formDataParam.name))
  
};
  return (
    <Grid  sx={{position:'sticky'}}>
        <ModalField
        open={openModal}
        onClose={onClose}
        dataForm={details}
        title={'edit_name'}
        onSubmit={onSubmitCreateContact}
        //toScreen={ //toScreen
        //setIsEdit={ //setIsEdit
        isEdit={false}
      />
    <Card className='navbar_chat'>
    <Avatar alt='user_photo' src={ ''} />
    <Grid onClick={()=>setOpenModal(true)}>
    <Typography sx={{m:1}}>
    {/* {prefix !== 'null' ? prefix : id} */}
    </Typography>
    </Grid>
    {/* <Grid sx={{m:1}}>
    <PopoverField values={userFiles && userFiles} title={'files'} type={'files'} />
    </Grid> */}
    </Card>
  </Grid>
  )
}

export default ConversationNavbar