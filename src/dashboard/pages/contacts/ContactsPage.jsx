import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import GridTable from '../../../components/Tables/GridTable';
import { Button, Card, Grid, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ModalForm from '../../../components/Modal/ModalForm';
import { createUser, getUser, updateUser } from '../../../store/slices/users';
import { toast } from 'react-toastify';
import PhoneModal from '../../../components/Modal/PhoneModal';
import { getLabelCateogory } from '../../../store/slices/picklist/thunks';
import { createContact, updateContact } from '../../../store/slices/contacts/thunks';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import moment from 'moment';

const ContactsPage = () => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openModalContact, setOpenModalContact] = useState(false);
  const [userId, setUserId] = useState(false);
  const [detailsForm, setDetailsForm] = useState([]);
  const [numberPhone, setNumberPhone] = useState([]);
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [message, setMessage] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isReloadData, setIsReloadData] = useState(false);
  const { userDetails } = useSelector((state) => state.users);
  const { categoryLabel } = useSelector((state) => state.picklist);

  const selectsCreate = new Map();
  selectsCreate.set('category_id', categoryLabel);
  console.log('categoryLabel', categoryLabel);
  const {
    control,
    formState: { errors },
    setValue,
    onInputChange,
    watch,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    setIsReloadData(false);
    if (isEdit) {
      const details = [
        // { name_: 'Nombre', key: 'name', allowEdit: false, type: 'text', value:userDetails?.data?.name },
        // { name_: 'Apellido', key: 'last_name', allowEdit: false, type: 'text',value:userDetails?.data?.last_name },
        // { name_: 'Email', key: 'email', allowEdit: false, type: 'email',value:userDetails?.data?.email },
        // { name_: t('username'), key: 'username', allowEdit: false, type: 'text',value:userDetails?.data?.username },
        // // { name_: t('password'), key: 'password', allowEdit: false, type: 'password',value:userDetails?.data?.password },
        // // { name_: t('confirm_password'), key: 'confirmPassword', allowEdit: false, type: 'password',value:userDetails?.data?.password },
        // { name_: t('avatar'), key: 'avatar', allowEdit: false, type: 'avatar',value:userDetails?.data?.avatar },
      ];
      setDetailsForm(details);
    } else {
      const details = [
        { name_: 'Nombre', key: 'name', allowEdit: false, type: 'text', value: '' },
        { name_: 'Numero', key: 'number', allowEdit: false, type: 'text', value: '' },
        { name_: t('category'), key: 'category_id', allowEdit: false, type: 'select', value: '' },
      ];
      setDetailsForm(details);
    }
  }, [isEdit, userDetails]);

  const onSubmit = async (formDataParam) => {
    console.log("aqui formDataParam",formDataParam)
    if (formDataParam.password === formDataParam.confirmPassword) {
      delete formDataParam.confirmPassword;
      if (isEdit) {
        const resp = await dispatch(updateUser(userId, formDataParam));
        if (resp === 200) {
          toast.success(t('saved'));
          setIsReloadData(true);
          setOpenModal(false);
        } else {
          toast.error(t('error'));
        }
      } else {
        const resp = await dispatch(createUser(formDataParam));
        if (resp === 200) {
          toast.success(t('saved'));
          setIsReloadData(true);
          setOpenModal(false);
        } else {
          toast.error(t('error'));
        }
      }
    }
  };

  const onSubmitCreateContact = async (formDataParam) => {
    const formData = {};
    Object.keys(formDataParam).forEach((item) => {
      if (
        typeof formDataParam[item] === 'object' &&
        formDataParam[item]?.value &&
        formDataParam[item]?.label
      ) {
        formData[item] = formDataParam[item].value;
      } else if (moment.isMoment(formDataParam[item])) {
        formData[item] = formDataParam[item].format('YYYY-MM-DD');
      } else if (formDataParam[item] instanceof FileList) {
        if (formDataParam[item].length > 0) {
          formData[item] = formDataParam[item][0];
        } else {
          formData[item] = null;
        }
      } else {
        formData[item] = formDataParam[item];
      }
    });


    console.log("formDataParam",formData)
    if (isEdit) {
      const resp = await dispatch(updateContact(userId, formData));
      if (resp === 200) {
        toast.success(t('saved'));
        setIsReloadData(true);
        setOpenModal(false);
      } else {
        toast.error(t('error'));
      }
    } else {
      const resp = await dispatch(createContact(formData));
      if (resp === 200) {
        toast.success(t('saved'));
        setIsReloadData(true);
        setOpenModal(false);
      } else {
        toast.error(t('error'));
      }
    }
  };

  const handleOnClick = async (params) => {
    setOpenModalContact(true)
    setNumberPhone(params.row.number)
    console.log("params",params)
    // setUserId(id);
    // setIsEdit(true);
    // const resp = await dispatch(getUser(id));
    // if (resp) {
    //   setOpenModalContact(true);
    // }
  };

  useEffect(() => {
    dispatch(getLabelCateogory());
  }, []);

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <DashboardLayout>
      <PhoneModal
        open={openModalContact}
        onClose={setOpenModalContact}
        onSubmit={onSubmit}
        title={t(`add_chat`)}
        number={numberPhone}
        //setExtensionNumber={setExtensionNumber}
        //setNumberPhone={setNumberPhone}
        setMessage={setMessage}
      />
      <ModalForm
        open={openModal}
        onClose={onClose}
        dataForm={detailsForm}
        title={'contact'}
        selectValues={selectsCreate}
        onSubmit={onSubmitCreateContact}
        //toScreen={ //toScreen
        //setIsEdit={ //setIsEdit
        isEdit={false}
      />
      <Card sx={{ marginTop: '10px', marginLeft: '5px', marginRight: '5px' }}>
        <Grid container sx={{ display: 'flex' }}>
          <Grid item xs={6}></Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'end' }} item xs={6}>
            <Button
              sx={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}
              size='large'
              color='iconverde'
              onClick={(event) => {
               setIsEdit(false), setOpenModal(true);
              }}
            >
              <NoteAddIcon color='iconw'></NoteAddIcon>
              <Typography sx={{ paddingLeft: '10px' }} color='white' variant='h2'>
                {t('create_contact')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ marginTop: '10px', marginBottom: '10px', marginLeft: '5px', marginRight: '5px' }}>
        <Grid container>
          <GridTable
            path='/whatsapp/contacts'
            title={t('contacts')}
            group='/contacts'
            prefix='contacts'
            isReloadData={isReloadData}
            columns={[
              
              {
                field: 'name',
                headerName: t('name'),
                sortable: false,
                renderCell: (params) => (
                  <>
                  <Typography
                    sx={{ }}
                    variant='p'
                    onClick={() => {
                      handleOnClick(params);
                    }}
                  >
                    {params.value}
                  </Typography>
                 
                  </>
                ),
                flex: 1,
                align: 'center',
              },
              {
                field: 'number',
                headerName: t('phone'),
                sortable: false,
                flex: 1,
                align: 'center',
                renderCell: (params) => (
                  <>
                  <WhatsAppIcon fontSize={'small'}/>
                  <Typography
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    variant='p'
                    onClick={() => {
                      handleOnClick(params);
                    }}
                  >
                    {params.value}
                    
                  </Typography>
              
                  </>
                ),
              },
              // {
              //   field: 'category_id',
              //   headerName: t('category_id'),
              //   sortable: false,
              //   flex: 1,
              //   align: 'center',
              // },
              {
                field: 'category',
                headerName: t('category'),
                flex: 1,
                align: 'center',
                sortable: false,
              },
              
            ]}
          />
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default ContactsPage;
