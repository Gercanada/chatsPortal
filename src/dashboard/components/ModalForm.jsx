import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';
// import { useUiStore } from '../../hooks/useUiStore';
import { useFetchApi } from '../hooks';
// import {  useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ModalForm = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore(); // const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { loading, response } = useFetchApi('/resource/tickets/create');

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    // end: addHours(new Date(), 2)
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.title.length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    /*   if (activeEvent !== null) {
              setFormValues({ ...activeEvent });
          } */
  }, []);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  /*     const onDateChanged = (event, changing) => {
            setFormValues({
                ...formValues,
                [changing]: event
            })
        } */

  const onCloseModal = () => {
    closeFormModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    closeFormModal();
    setFormSubmitted(false);
  };

  let modalState = false;
  const handleClose = () => {
    modalState = !!modalState;
  };

  return (
    <Modal
      style={customStyles}
      // onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        height='calc(100vh - 200px)'
      >
        <form noValidate>
          <Box
            sx={{
              width: 450,
              padding: '30px 20px',
              borderRadius: '3px',
            }}
            className='modal-card'
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/*    <Typography
                                variant='h1'
                                component='h1'
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <img
                                    style={{ paddingBottom: '40px' }}
                                    src='/images/immcaselogo.png'
                                    width='250px'
                                    alt=''
                                />
                            </Typography> */}
                <Typography
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  variant='h1'
                  component='h1'
                >
                  Create case
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='email'
                  label='Correo electrónico'
                  variant='filled'
                  fullWidth
                  autoComplete='new-email'
                  /*  {...register('email', {
                                     required: 'Ingrese correo electronico',
                                     validate: (val) => validations.isValidEmail(val),
                                 })}
                                 error={!!errors.email}
                                 helperText={errors.email?.message} */
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='password'
                  label='Contraseña'
                  variant='filled'
                  fullWidth
                  autoComplete='new-password'
                  /*   {...register('password', {
                                      required: 'Ingrese Contraseña',
                                  })}
                                  error={!!errors.password}
                                  helperText={errors.password?.message} */
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type='submit'
                  color='secondary'
                  className='circular-btn'
                  size='large'
                  fullWidth
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
