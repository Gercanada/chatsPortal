import { Box, Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotificationBox = ({ userName, bodyMessage, stylesContainer, icon }) => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <Box sx={stylesContainer}>
      <Grid sx={{ display: 'flex' }}>
        <Typography sx={{color:'black'}}>
          {icon} {userName}:
        </Typography>
        <Typography noWrap sx={{color:'black'}}>{bodyMessage}</Typography>
      </Grid>
    </Box>
  );
};

export default NotificationBox;
