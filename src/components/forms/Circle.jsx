import React, { useState } from 'react';
import './circleStyles.css';
import { Grid } from '@mui/material';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import PopoverField from '../Popovers/PopoverField';

const Circle = ({ selected, onClick, color, values,id }) => {
  const hasColor = {
    background: 'red',
  };
  const circleClass = selected ? `${hasColor} circle ` : `${hasColor} circle `;
  return (
    <Grid
      className={'circle'}
      sx={{ backgroundColor: color, textAlign: 'center', m: 1 }}
    >
      <PopoverField id={id} onClick={onClick} values={values} icon={ <LabelOutlinedIcon sx={{ m: 1 }} />} title={'labels'}  type={'color'} />
    </Grid>
  );
};

export default Circle;
