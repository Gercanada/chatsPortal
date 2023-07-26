import { TextField } from '@mui/material';
import { useContext, useState } from 'react';
/* import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'; */
// import DatePicker, { registerLocale } from "react-datepicker";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

// registerLocale('es', es);

export const InputDate = (val) => {
  const field = val.field;

  const [formValues, setFormValues] = useState({
    /*     title: '',
            notes: '', */
    // end: addHours(new Date(), 2)
    date: new Date(),
  });
  const [value, setValue] = useState(new Date());

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  //  const context = useContext();

  /*     const handleDateChange = (date) => {
            setSelectedDate(date)
        } */
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label='Helper text example'
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} helperText={params?.inputProps?.placeholder} />
      )}
    />
  );
};
