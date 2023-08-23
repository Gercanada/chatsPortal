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
import { createUser, getUser } from '../../../store/slices/users';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(false);
  const [detailsForm, setDetailsForm] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { userDetails } = useSelector((state) => state.users);
  console.log('userDetails', userDetails?.data);

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

  // const details = [
  //   { name_: 'Nombre', key: 'name', allowEdit: false, type: 'text', value:userDetails?.data?.name },
  //   { name_: 'Apellido', key: 'last_name', allowEdit: false, type: 'text',value:userDetails?.data?.last_name },
  //   { name_: 'Email', key: 'email', allowEdit: false, type: 'email',value:userDetails?.data?.email },
  //   { name_: t('username'), key: 'username', allowEdit: false, type: 'text',value:userDetails?.data?.username },
  //   // { name_: t('password'), key: 'password', allowEdit: false, type: 'password',value:userDetails?.data?.password },
  //   // { name_: t('confirm_password'), key: 'confirmPassword', allowEdit: false, type: 'password',value:userDetails?.data?.password },
  //   { name_: t('avatar'), key: 'avatar', allowEdit: false, type: 'avatar',value:userDetails?.data?.avatar },
  // ];

  useEffect(() => {
    if(isEdit){
      console.log("aqui toy")
    const details = [
      { name_: 'Nombre', key: 'name', allowEdit: false, type: 'text', value:userDetails?.data?.name },
      { name_: 'Apellido', key: 'last_name', allowEdit: false, type: 'text',value:userDetails?.data?.last_name },
      { name_: 'Email', key: 'email', allowEdit: false, type: 'email',value:userDetails?.data?.email },
      { name_: t('username'), key: 'username', allowEdit: false, type: 'text',value:userDetails?.data?.username },
      // { name_: t('password'), key: 'password', allowEdit: false, type: 'password',value:userDetails?.data?.password },
      // { name_: t('confirm_password'), key: 'confirmPassword', allowEdit: false, type: 'password',value:userDetails?.data?.password },
      { name_: t('avatar'), key: 'avatar', allowEdit: false, type: 'avatar',value:userDetails?.data?.avatar },
    ];
    setDetailsForm(details)
  }else{
    console.log("aqui toy 2")
    const details = [
      { name_: 'Nombre', key: 'name', allowEdit: false, type: 'text',value:'' },
      { name_: 'Apellido', key: 'last_name', allowEdit: false, type: 'text',value:'' },
      { name_: 'Email', key: 'email', allowEdit: false, type: 'email',value:'' },
      { name_: t('username'), key: 'username', allowEdit: false, type: 'text',value:'' },
      { name_: t('password'), key: 'password', allowEdit: false, type: 'password',value:'' },
      { name_: t('confirm_password'), key: 'confirmPassword', allowEdit: false, type: 'password',value:'' },
      { name_: t('avatar'), key: 'avatar', allowEdit: false, type: 'avatar',value:'' },
    ];
    setDetailsForm(details)
  }
  }, [isEdit,userDetails])
  

  const onSubmit = async (formDataParam) => {
    console.log('formDataParam', formDataParam);
    if (formDataParam.password === formDataParam.confirmPassword) {
      delete formDataParam.confirmPassword;
      const resp = await dispatch(createUser(formDataParam));
      if (resp === 200) {
        toast.success(t('saved'));
      } else {
        toast.error(t('error'));
      }
    }
  };

  const handleOnClick =  async (id) => {
    setUserId(id);
    setIsEdit(true)
    const resp = await dispatch(getUser(id));
    if(resp){
      setOpenModal(true)
    }
  };

  return (
    <DashboardLayout>
      <ModalForm
        open={openModal}
        onClose={setOpenModal}
        dataForm={detailsForm && detailsForm}
        //  selectValues={selectCountries}
        setIsEdit={setIsEdit}
        onSubmit={onSubmit}
        title={t('create_contact')}
        isEdit={isEdit}
        // toScreen={toScreen}
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
                setIsEdit(false),
                setOpenModal(true)
              }}
            >
              <NoteAddIcon color='iconw'></NoteAddIcon>
              <Typography sx={{ paddingLeft: '10px' }} color='white' variant='h2'>
                {t('create_user')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ marginTop: '10px', marginBottom: '10px', marginLeft: '5px', marginRight: '5px' }}>
        <Grid container>
          <GridTable
            path='/users'
            title={t('users')}
            group='/users'
            prefix='users'
            //isReloadData={isReloadData}
            columns={[
              {
                field: 'username',
                headerName: t('username'),
                sortable: false,
                renderCell: (params) => (
                  <Typography
                  sx={{cursor:'pointer', textDecoration:'underline'}}
                    variant='p'
                    onClick={() => {
                      handleOnClick(params.id);
                    }}
                  >
                    {params.value}
                  </Typography>
                  // <Link
                  //   style={{ color: isLightTheme === false ? 'white' : '' }}
                  //   to={`/contacts/${params.id}`}
                  // >
                  //   {params.value}
                  // </Link>
                ),
                flex: 1,
                align: 'center',
              },
              {
                field: 'name',
                headerName: t('name'),
                sortable: false,
                flex: 1,
                align: 'center',
              },
              {
                field: 'last_name',
                headerName: t('last_name'),
                sortable: false,
                flex: 1,
                align: 'center',
              },
              { field: 'email', headerName: t('email'), flex: 1, align: 'center', sortable: false },
            ]}
          />
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default UsersPage;
