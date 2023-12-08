import { Avatar, Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './chatsStyles.css';
import { useParams } from 'react-router-dom';
import PopoverField from '../../../../components/Popovers/PopoverField';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContactThread,
  getUserFiles,
  updateContactNameThread,
} from '../../../../store/slices/whatsApp/thunks';
import ModalForm from '../../../../components/Modal/ModalForm';
import ModalField from '../../../../components/Modal/ModalField';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const ConversationNavbar = ({ user }) => {
  const { id, thread, prefix } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userFiles } = useSelector((state) => state.whatsApp);
  const [openModal, setOpenModal] = useState(false);
  const [contactName, setContactName] = useState('')

  useEffect(() => {
    dispatch(getUserFiles(thread));
  }, [id]);

  const details = [{ name_: 'Nombre', key: 'name', allowEdit: false, type: 'text', value: '' }];

  const onClose = () => {
    setOpenModal(false);
  };

  const onSubmitCreateContact = async (formDataParam) => {
    const resp= await dispatch(updateContactNameThread(thread, formDataParam.name));
    if(resp===200){
      onClose();
      handleGetThread();
    }else{
      toast.error("error")
    }
  };

  const handleGetThread = async () => {
    const resp = await dispatch(getContactThread(id));
    const name = resp?.data?.data[0].name
    setContactName(name);
  };
  useEffect(() => {
    handleGetThread()
  }, [id,thread])
  
  return (
    <Grid sx={{ position: 'sticky' }}>
      <ModalField
        open={openModal}
        onClose={onClose}
        dataForm={details}
        title={t('save_contact')}
        onSubmit={onSubmitCreateContact}
        isEdit={false}
      />
      <Card className='navbar_chat'>
        {/* <Avatar alt='user_photo' src={''} /> */}
        <Grid >
          <Typography sx={{cursor:'pointer'}} onClick={() => setOpenModal(true)}>{
            contactName ? contactName : <>{t('add_name')}<ModeEditOutlineIcon/></>
            }</Typography>
          <Typography>{id}</Typography>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ConversationNavbar;
