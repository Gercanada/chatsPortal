import { Box, Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MessagesBox = ({ userName, contactnumber, stylesContainer, icon }) => {
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
    <Box sx={{
        ...stylesContainer,
        boxSizing: 'border-box', // Include padding and border in the element's width
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Reduce padding and margin if necessary to fit within the parent's width
      }}>
      <Grid sx={{display:'flex'}}>
        <Typography noWrap  >{userName}:</Typography>
        <Typography>{contactnumber}</Typography>
      </Grid>
      {icon}
    </Box>
  );
};

export default MessagesBox;
