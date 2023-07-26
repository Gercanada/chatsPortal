import { Box, InputLabel, MenuItem, TextareaAutosize, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchApi } from '../hooks';
import { createRecord, updateRecord, updateRecordFormData } from '../../store/slices/form/thunks';
import CDatePicker from './CDatePicker';
import moment from 'moment';
import StyledReactSelect from './StyledReactSelect';
import { useTranslation } from 'react-i18next';

export const CustomCreate = ({
  path,
  id,
  fetchTo,
  describe,
  createContentType = 'application/json',
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  /*  const queryString = window.location.search; // Cuando se  va a crear una checklist dentro de la vista de checklists del caso, tendremos el case preseleccionado

  const navigateTo = (url) => {
    navigate(url);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    onInputChange,
  } = useForm({
    defaultValues: {},
  });

  if (typeof id !== 'undefined') {
    const { response } = useFetchApi(`${fetchTo}/${id}`);
    if (typeof response !== 'undefined') {
      if (response?.status >= 400) {
        toast.error(`record with id = ${id} not found`);
        path && navigateTo(`${path}`);
      } else {
        const content = response?.data?.object?.content || [];
        if (Object.keys(content).length > 0) {
          Object.entries(content).forEach(([key, value]) => {
            let setVal = null;
            if (typeof value !== 'undefined' && value !== null) {
              if (typeof value === 'object') {
                if (Object.keys(value).includes('ref')) {
                  setVal = value?.ref.split('/')[4];
                }
              } else {
                setVal = value;
              }
              setValue(key, setVal);
            }
          });
        }
      }
    }
  }

  const [selections, setSelections] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  const { loading, response } = useFetchApi(`${fetchTo}/create`);
  useEffect(() => {
  }, [selectedFile]);

  const onSubmit = (formDataParam) => {
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

    Object.keys(formData).includes('id')
      ? Object.keys(formData).includes('image')
        ? dispatch(updateRecordFormData(formData, fetchTo)).then((res) => {
            if (res.status === 200 || res.status === 201) navigateTo(path);
          })
        : dispatch(updateRecord(formData, fetchTo)).then((res) => {
            if (res.status === 200 || res.status === 201) navigateTo(path);
          })
      : dispatch(createRecord(formData, fetchTo, createContentType)).then((res) => {
          if (res.status === 200 || res.status === 201) navigateTo(path);
        });
  };

  /*   const handleChange = (event) => {
    const name = event.target.name;
    setSelections((selections) => [...selections, { name, value: event.target.value }]);
  }; */

  /*
  const menuItems = (arr) => {
    const newArr = [];
    arr.forEach((item, i) => {
      newArr.push(
        <MenuItem key={i} value={item.id}>
          {item.value}
        </MenuItem>,
      );
    });
    return newArr;
  };
  */
  const [state, setState] = useState([]);

  const buildOptions = (picklist) => {
    if (picklist) {
      const arr = Object.values(picklist);
      return arr.map((i) => ({ value: i.id, label: i.value }));
    }
    return [];
  };

  const filesChange = (e) => {
    const files = e.target.files;
    const filesArr = Array.prototype.slice.call(files);
    setState({ files: [...state.files, ...filesArr] });
  };

  const fType = (type) => {
    if (['Double', 'integer', 'Integer', 'float'].includes(type.name)) {
      return 'number';
    }
    if (type.name === 'Date') {
      return 'date';
    }
    if (type.name === 'File') {
      return 'file';
    }
    if (type.name === 'reference') {
      return 'reference';
    }
    if (type.name === 'text') {
      return 'longText';
    } else return 'text';
  };

  const fieldsGroup = [];
  const newForm = () => {
    if (response?.data) {
      const tst = Object.values(response?.data);

      const fieldsArr = tst[0][`${describe}`] || [];

      if (fieldsArr.length > 0) {
        fieldsArr.forEach((field, i) => {
          if (field?.name === 'description') {
            fieldsGroup[field?.name] = (
              <Box>
                <InputLabel id={field.name}>{t(field.name)}</InputLabel>
                <TextareaAutosize
                  {...register(`${field.name}`, {
                    required: field.mandatory === 1 ? true : 0,
                  })}
                  onChange={onInputChange}
                  key={i}
                  aria-label='empty textarea'
                  placeholder='some Description'
                  name={field.name}
                  label={field?.name}
                  style={{ width: '100%' }}
                  minRows={5}
                />
              </Box>
            );
          } else if (fType(field.type) === 'reference') {
            fieldsGroup[field.name] = (
              <Box>
                <InputLabel id={field.name}>{t(field.name)}</InputLabel>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: fieldSelect }) => (
                    <StyledReactSelect
                      {...fieldSelect}
                      options={buildOptions(field?.type?.picklist)}
                    />
                  )}
                />
              </Box>
            );
          } else if (fType(field.type) === 'date') {
            fieldsGroup[field.name] = (
              <Box>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: fieldDatePicker }) => (
                    <CDatePicker label={t(field.name)} {...fieldDatePicker} />
                  )}
                />
              </Box>
            );
          } else {
            fieldsGroup[field.name] = (
              <Box>
                <InputLabel id={field.name}>{t(field.name)}</InputLabel>
                <TextField
                  {...register(`${field.name}`, {
                    required: field.mandatory === 1 ? true : 0,
                  })}
                  key={i}
                  type={fType(field.type)}
                  name={field.name}
                  // label={field.label}
                  variant='filled'
                  fullWidth
                  autoComplete={`new-${field.name}`}
                  error={!!errors[`${field.name}`]}
                  helperText={errors[`${field.name}`]?.message}
                  onChange={onInputChange}
                />
              </Box>
            );
          }
        });
      }
    }
  };
  newForm();
  return { fieldsGroup, loading, handleSubmit, onSubmit };
};
