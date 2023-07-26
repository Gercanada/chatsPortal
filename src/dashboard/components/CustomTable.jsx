import MaterialTable from '@material-table/core';
import { Button, Grid, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { immcaseApi } from '../../api';
import { Loader } from '../../components/Loader';
import { useFetchApi } from '../hooks';
import 'sweetalert2/dist/sweetalert2.min.css';

export const CustomTable = ({ data }) => {
  const pathTo = data.path;
  const group = data.group;

  const { loading, response, getResponse } = useFetchApi(pathTo, '?name=example&lastname=another');

  const callDelete = async (id) => {
    const res = await immcaseApi.delete(`${path}/${id}`);
    return res;
  };

  const { isLightTheme } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  const formTitle = data?.create?.new || 'NO Title';
  const title = data?.title || '';
  const body = [];
  const path = data?.path;

  const refersTo = (route) => {
    let element = route.split('/')[3];

    if (
      ['assessments', 'tickets', 'cases', 'checklists', 'items', 'profiles'].includes(
        route.split('/')[3] || route.split('/')[3],
      )
    ) {
      if (element === 'tickets') {
        element = 'cases';
      }
      return `/immigration/${element}/${route.split('/')[4]}`;
    }

    if (
      [
        'agents',
        'clients',
        'invoices',
        'payment_schedules',
        'payments',
        'permissions',
        'quotes',
        'roles',
        'users',
      ].includes(element)
    ) {
      return `/admin/${route.split('/')[3]}/${route.split('/')[4]}`;
    }
  };

  if (response && Object.keys(response).length > 0) {
    const arr = response?.data;
    if (arr.length > 0) {
      Object.values(arr).forEach((item) => {
        const newItem = {};
        let id = null;
        Object.entries(item).forEach(([key, value]) => {
          // get Item id
          if (key.split('.')[1] === 'id') {
            id = value;
          }
          return '';
        });
        Object.entries(item).forEach(([key, value]) => {
          if (key.split('.')[1] === 'title' || key.split('.')[1] === 'subject') {
            newItem[key] = (
              <RouterLink
                style={{ color: isLightTheme ? 'blue' : '#16CDFF' }}
                to={`${group}/${id}`}
              >
                {value}
              </RouterLink>
            );
          } /* if (key.split('.')[1] !== 'id') */ else {
            newItem[key] =
              typeof value === 'object' && !(typeof value === 'undefined' || value === null) ? (
                value?.refs ? (
                  <RouterLink
                    style={{ color: isLightTheme ? 'blue' : '#16CDFF' }}
                    to={`${refersTo(value?.refs)}`}
                  >
                    {value.value}
                  </RouterLink>
                ) : (
                  value?.value
                )
              ) : (
                value
              );
          }
        });
        body.push(newItem);
      });
    }
  }

  return (
    <Grid container spacing={2}>
      {loading && <Loader />}
      <Grid item xs={12}>
        <Button
          sx={{ marginTop: '10px', marginBottom: '40px', float: 'right' }}
          size='large'
          color='primary'
          onClick={(event) => {
            navigateTo(`${group}/create`);
          }}
        >
          <Typography sx={{ paddingRight: '10px' }} color='white' variant='h2'>
            New {formTitle}
          </Typography>
          <NoteAddIcon color='iconw'></NoteAddIcon>
        </Button>
      </Grid>

      <Grid item xs={12}>
        <MaterialTable
          title={title}
          columns={response?.columns}
          data={body}
          actions={[
            {
              icon: () => <DeleteOutlined />,
              tooltip: `Delete ${formTitle}`,
              onClick: (event, rowData) => {
                Swal.fire({
                  title: 'Are you sure?',
                  text:
                    'You want to delete record with id =' + rowData[`${pathTo.split('/')[2]}.id`],
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
                  if (result.isConfirmed) {
                    callDelete(rowData[`${pathTo.split('/')[2]}.id`])
                      .then((res) => {
                        Swal.fire('Deleted!', 'Record has been deleted.', 'success');
                      })
                      .catch((error) => {
                      })
                      .finally(getResponse());
                  }
                });
              },
            },
            {
              icon: () => <EditOutlined />,
              tooltip: 'Edit record',
              onClick: (event, rowData) => {
                const id = rowData[`${pathTo.split('/')[2]}.id`];
                navigateTo(`/immigration/${group.split('/')[2]}/${id}/edit`);
              },
            },
          ]}
          options={{
            search: false,
            filtering: true,
            rowStyle: {
              fontSize: 'initial',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
