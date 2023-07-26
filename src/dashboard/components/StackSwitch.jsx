import { Chip, CircularProgress, Stack, Switch, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateSwitchValue } from '../../store/slices/detailFieldHelper';

export const StackSwitch = ({ field }) => {
  const {
    key,
    value,
    activeIcon,
    inactiveIcon,
    url_put_for_save,
    method,
    tTitle,
    onFinish,
    defaultChecked = 0,
  } = field;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(defaultChecked);
  const [internalLoading, setInternalLoading] = useState(false);

  const onChange = async (e) => {
    setChecked(e.target.checked ? 1 : 0);
    setInternalLoading(true);
    await dispatch(
      updateSwitchValue({
        key,
        value: e.target.checked ? 1 : 0,
        url_put_for_save,
        method,
      }),
    );
    setInternalLoading(false);
    if (onFinish) onFinish();
  };

  return (
    <Stack
      direction='row'
      name={key}
      alignItems='center'
      justifyContent='space-between'
      sx={{ px: 2, py: 1, borderBottom: '1px solid' }}
    >
      <Chip label={t(key)} color={checked ? 'success' : 'secondary'} />
      {internalLoading ? (
        <CircularProgress size={22} />
      ) : (
        <Tooltip title={tTitle} variant='solid'>
          <Switch
            name={key}
            checkedIcon={activeIcon}
            icon={inactiveIcon}
            defaultValue={checked}
            checked={checked}
            onChange={onChange}
            //TODO Agregar spinner (loading) al icono cuando se cambia de un estado a otro
          />
        </Tooltip>
      )}
    </Stack>
  );
};
