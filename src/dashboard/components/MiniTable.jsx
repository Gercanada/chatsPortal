import MaterialTable from '@material-table/core';
import { createRef, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { EditOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


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
          if (key === 'id') {
            id = value;
          }
          return '';
        });
        Object.entries(item).forEach(([key, value]) => {
          if (value === null || typeof value === 'undefined') value = '';
          if (['avatar', 'image', 'photo', 'picture'].includes(key)) {
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
              ].includes(key)
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

const MiniTable = (props) => {
  const { t } = useTranslation();
  const { title, path, group, columns, prefix } = props;
  const { isLightTheme } = useSelector((state) => state.ui);
  const [loading, setLoading] = useState(false);

  const translateCols = (cols) => {
    const translations = [];
    if (cols.length > 0) {
      cols.forEach((col) => translations.push({ title: t(col), field: col }));
    }
    return translations;
  };
  const tCols = translateCols(columns);

  const dataAsync = async (query) => {
    setLoading(true);
    const response = await CustomTableService.findAll({ path, query });
    setLoading(false);
    if (response) {
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
      stickyHeader
      localization={{
        header: {
          actions: t('actions'),
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
          icon: () => <EditOutlined />,
          tooltip: 'Edit record',
          onClick: (event, rowData) => {
            const id = rowData[`${path.split('/')}.id`];
            navigate(`/${group.split('/')[1]}/${group.split('/')[2]}/${id}/edit`);
          },
        },
      ]}
      options={{
        search: false,
        filtering: false,
        sorting: false,
        rowStyle: {
          fontSize: 'initial',
        },
      }}
    />
  );
};

MiniTable.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
};

MiniTable.defaultProps = {
  title: 'Tabla',
};

export default MiniTable;
