import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import React from 'react';

const CDatePicker = ({ value, ...otherProps }) => (

  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      {...otherProps}
      value={value === undefined ? '' : value}
      renderInput={(params) => <TextField fullWidth {...params} />}
      inputFormat="yyyy/MM/DD" 
    />
  </LocalizationProvider>
);

const WrappedComponent = React.forwardRef((props, ref) => {
  return <CDatePicker {...props} forwardedRef={ref} />;
});

export default WrappedComponent;
