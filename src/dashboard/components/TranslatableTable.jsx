import MaterialTable from '@material-table/core';
import { createRef, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { EditOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Avatar, Typography } from '@mui/material';
import moment from 'moment';
import { mapDate } from '../../functions/dateUtil';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

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
  // alert(mapDate('2023/01/03 17:09:09'));
  const baseURL = import.meta.env.VITE_IMMCASEAPI;
  let host = baseURL.split('/');
  host.pop();
  host = host.join('/');
  /*
  const doColsFromObj = (obj) => {
    return Object.keys(obj);
  };
  alert({
    // ! Paste here  row obj
    columns: doColsFromObj({
      id: 1,
      name: 'Beahan, Ryan and Mitchell',
      agent_no: '7363978194076',
      main_contact_full_name: 'Orie Johns II',
      main_email: 'janelle63@hotmail.com',
      description: 'Aperiam corporis accusamus sapiente vel qui dolores enim.',
      assigned_to: {
        refs: '/api/resource/users/1',
        value: 'lars_goetia',
      },
    }),
  }); */

  const body = [];
  if (response && Object.keys(response).length > 0) {
    const arr = response?.data || [];
    if (arr.length > 0) {
      Object.values(arr).forEach((item) => {
        const newItem = {};
        let id = null;
        Object.entries(item).forEach(([key, value]) => {
          // get Item id
          if (key === 'id') {
            id = value;
          }
          return '';
        });
        Object.entries(item).forEach(([key, value]) => {
          if (value === null || typeof value === 'undefined') value = '';
          if (['avatar', 'image', 'photo', 'picture'].includes(key)) {
            newItem[key] = (
              // <Avatar alt={'Avatar'} src={`https://api.immcase.com/storage/${value}`} />
              <Avatar alt={'Avatar'} src={`${host}/storage/${value}`} />
            );
          } else {
            if (
              [
                'title',
                'subject',
                'name',
                'ticket_no',
                'first_name',
                'last_name',
                'commercial_name',
                'username',
              ].includes(key)
            ) {
              //! Marca estas propiedades como enlace y dirigen al registro en su id
              newItem[key] = (
                <RouterLink
                  style={{ color: isLightTheme ? 'blue' : '#16CDFF' }}
                  to={`${group}/${id}`}
                >
                  {value}
                </RouterLink>
              );
            } else {
              if (typeof value === 'object' && !(value === null)) {
                if ('refs' in value) {
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
                  newItem[key] = 'value' in value ? value.value : JSON.stringify(value);
                }
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

const TranslatableTable = (props) => {
  const { t } = useTranslation();
  const { title, path, group, columns, prefix, mappingData } = props;
  const { isLightTheme } = useSelector((state) => state.ui);
  const [loading, setLoading] = useState(false);
  const [paginationSize, setPaginationSize] = useState([]);
  // const [columns, setColumns] = useState([]);

  const translateCols = (cols) => {
    const translations = [];
    if (cols.length > 0) {
      cols.forEach((col) => translations.push({ title: t(col), field: col }));
    }
    return translations;
  };
  const tCols = translateCols(columns);
  const dataAsync = async (query) => {
    // Obtenemos los datos de la tabla mediante una petición HTTP al servicio externo
    const response = await CustomTableService.findAll({ path, query});

    // Si la respuesta del servicio es válida, mapeamos los datos y los devolvemos junto con la información de paginación
    if (response) {
      const data = mapData({ response, isLightTheme, group });
      if(response.totalCount >= 100){
        setPaginationSize([10,25,60,100])
      }else if(response.totalCount <=30){
        setPaginationSize([10,response.totalCount])
      }else if(response.totalCount > 25 && response.totalCount < 100 ){
        setPaginationSize([10,30,response.totalCount])
      }
    
      data.length > 0 &&
        data.map((item) =>
          item.active === 1
            ? (item.active = <CheckCircleIcon color='success' />)
            : (item.active = <DangerousIcon sx={{ color: 'red' }} />),
        );
      return {
        data,
        page: response.page,
        totalCount: response.totalCount,
      };
    }

    // En caso contrario, devolvemos una tabla vacía
    return {
      data: [],
      page: 0,
      totalCount: 0,
    };
  };

  const navigate = useNavigate();
  const updateDataTable = () => {
    if (tableRef.current) tableRef.current.onQueryChange();
  };

  return (
    <MaterialTable
      tableRef={tableRef}
      title={title}
      columns={tCols}
      data={dataAsync}
      isLoading={loading}
      localization={{
        header: {
          actions: t('actions'),
          /*    t, */
        },
      }}
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
          icon: () => <EditOutlined sx={{ minWidth: '80px' }} />,
          tooltip: 'Edit record',
          onClick: (event, rowData) => {
            const id = rowData?.id; //rowData[`${path.split('/')}.id`];
            navigate(`/${group.split('/')[1]}/${group.split('/')[2]}/${id}/edit`);
          },
        },
      ]}
      options={{
        search: false,
        filtering: true,
        sorting: false,
        pageSize: 10,
        pageSizeOptions: paginationSize,
        paginationType: 'normal',
        paginationPosition:'both',
        draggable:false,
        rowStyle: {
          fontSize: 'initial',
        },
      }}
    />
  );
};

TranslatableTable.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
};

TranslatableTable.defaultProps = {
  title: 'Tabla',
};

export default TranslatableTable;
