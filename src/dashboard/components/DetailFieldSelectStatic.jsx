import {
  Box,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import StyledReactSelect from './StyledReactSelect';
import { updateSelectValue } from '../../store/slices/detailFieldHelper';

const DetailFieldSelectStatic = ({ field }) => {
  const { key, value, url_put_for_save, method = 'PUT', options, onFinish } = field;

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { control, register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (formDataParam) => {
    if (formDataParam?.key_form && formDataParam?.key_form?.value) {
      // return;
      setLoading(true);
      await dispatch(
        updateSelectValue({ url_put_for_save, key, value: formDataParam?.key_form?.value, method }),
      );
      setLoading(false);
      setEditable(false);
      if (onFinish) onFinish();
    } else {
      setEditable(false);
    }
  };

  const getSelectedValue = () => {
    return options.find((i) => i?.value === value);
  };

  useEffect(() => {
    const option = getSelectedValue();
    if (option) setSelectedLabel(option.label);
  }, [value]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item>
        <ButtonGroup
          disableElevation
          variant='contained'
          aria-label='Disabled elevation buttons'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography variant='p' sx={{ fontWeight: 'bold', width: '30%', paddingLeft: '5px' }}>
            {t(key)}
          </Typography>
          {editable ? (
            <Box sx={{ width: '90%' }}>
              <Controller
                {...register('key_form', {})}
                name={'key_form'}
                control={control}
                render={({ field: fieldSelect }) => (
                  <StyledReactSelect
                    defaultValue={getSelectedValue()}
                    {...fieldSelect}
                    options={options}
                  />
                )}
              />
            </Box>
          ) : (
            <Typography
              variant='p'
              sx={{
                width: '50%',
                paddingLeft: '5px',
                borderBottom: 'solid #CECECE 1px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onMouseOver={() => setShowComponent(true)}
              onMouseOut={() => setShowComponent(false)}
              onClick={() => {
                setEditable(!editable);
                setShowComponent(false);
              }}
            >
              {selectedLabel}
              {showComponent ? <EditOutlined /> : ''}
            </Typography>
          )}
          {editable && !loading && (
            <Tooltip title={t('save_changes')}>
              <IconButton type='submit' sx={{ width: '10%' }} variant='contained' color='success'>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
          {loading ? (
            <Tooltip title={t('loading')} style={{ marginLeft: 20 }}>
              <CircularProgress size={22} />
            </Tooltip>
          ) : editable ? (
            <Tooltip title={t('cancel')}>
              <IconButton
                sx={{ width: '10%' }}
                onClick={() => setEditable(!editable)}
                variant='contained'
                color={'error'}
              >
                {<CancelIcon />}
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
        </ButtonGroup>
      </Grid>
    </form>
  );
};

export default DetailFieldSelectStatic;
