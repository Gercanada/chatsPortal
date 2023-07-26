import MaterialTable from '@material-table/core';
import { createRef, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { EditOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const tableRef = createRef();

const refersTo = (route) => {
  let element = route.split('/')[3];

  if (
    ['assessments', 'tickets', 'cases', 'checklists', 'items', 'profiles'].includes(
      route.split('/')[3],
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

const mapData = ({ response, isLightTheme, group }) => {
  const body = [];
  if (response && Object.keys(response).length > 0) {
    const arr = response?.data || [];
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
          if (['avatar', 'image', 'photo', 'picture'].includes(key.split('.')[1])) {
            newItem[key] = <img src={value} alt='' style={{ maxHeight: '55px' }} />;
          } else {
            if (
              [
                'title',
                'subject',
                'name',
                'first_name',
                'last_name',
                'commercial_name',
                'username',
              ].includes(key.split('.')[1])
            ) {
              newItem[key] = (
                <RouterLink
                  style={{ color: isLightTheme ? 'blue' : '#16CDFF' }}
                  to={`${group}/${id}`}
                >
                  {value}
                </RouterLink>
              );
            } else {
              if (
                typeof value === 'object' &&
                !(typeof value === 'undefined' || value === null) &&
                value?.refs
              ) {
                newItem[key] = (
                  <RouterLink
                    style={{ color: isLightTheme ? 'blue' : '#16CDFF' }}
                    to={`${refersTo(value?.refs)}`}
                  >
                    {/* {value?.value} */}
                    {typeof value?.value === 'string' && value?.value.length >= 28
                      ? value?.value.substring(0, 28) + '... '
                      : value?.value}
                  </RouterLink>
                );
              } else {
                newItem[key] =
                  typeof value === 'string' && value.length >= 28
                    ? value.substring(0, 28) + '... '
                    : value;
              }
            }
          }
        });
        body.push(newItem);
      });
    }
  }
  return body;
};

/*
PROPS
title: Titulo de la tabla 
path: 
group: 
*/

const CTable = (props) => {
  const { title, path, group, prefix } = props;

  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isLightTheme } = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const dataAsync = async (query) => {
    setLoading(true);
    const response = await CustomTableService.findAll({ path, query, prefix });
    setLoading(false);
    if (response) {
      if (columns.length === 0) setColumns(response.columns); // just set at first time
      return {
        data: mapData({ response, isLightTheme, group }),
        page: response.page,
        totalCount: response.totalCount,
      };
    }
    return {
      data: [],
      page: 0,
      totalCount: 0,
    };
  };

  const updateDataTable = () => {
    if (tableRef.current) tableRef.current.onQueryChange();
  };

  const onRowDelete = async (oldData) => {
    await CustomTableService.callDelete({ id: oldData['tickets.id'], path })
      .then((res) => {
        toast.success('El registro ha sido borrado');
        updateDataTable();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <MaterialTable
      tableRef={tableRef}
      title={title}
      columns={columns}
      data={dataAsync}
      isLoading={loading}
      editable={
        {
          // onRowDelete,
        }
      }
      actions={[
        {
          icon: () => <RefreshIcon />,
          tooltip: 'Recargar',
          isFreeAction: true,
          onClick: updateDataTable,
        },
        {
          icon: () => <EditOutlined />,
          tooltip: 'Edit record',
          onClick: (event, rowData) => {
            const id = rowData[`${path.split('/')[2]}.id`];
            navigate(`/${group.split('/')[1]}/${group.split('/')[2]}/${id}/edit`);
            // navigate(`/immigration/${group.split('/')[2]}/${id}/edit`);
          },
        },
      ]}
      options={{
        search: false,
        filtering: true,
        sorting: false,
        rowStyle: {
          fontSize: 'initial',
        },
      }}
    />
  );
};

CTable.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
};

CTable.defaultProps = {
  title: 'Tabla',
};

export default CTable;
