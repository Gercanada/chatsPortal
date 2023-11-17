import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TablePagination,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPagination } from '../../store/slices/pagination/thunks';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataGrid,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
  GridFooterContainer,
} from '@mui/x-data-grid';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './tableStyles.css';
import { deleteRecord } from '../../store/slices/form/thunks';
import { ModalAlert } from '../Modal/ModalAlert';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader';

function TablePaginationActions(props) {
  const {t} = useTranslation();
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <Typography variant='caption'>
      {`${t('page')} ${page + 1} ${t('of')} ${Math.ceil(count / rowsPerPage)}`}
      </Typography>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function CustomPagination2() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const [totalCount, setTotalCount] = useState([]);

  useEffect(() => {
    if (pageCount <= 30) {
      setTotalCount([10, 30]);
    } else {
      setTotalCount([10, 25, 60, 100]);
    }
  }, [pageCount]);

  const handleChangePage = (event, newPage) => {
    apiRef.current.setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    apiRef.current.setPageSize(parseInt(event.target.value, 10));
  };
  return (
    <table>
      <tbody>
        <tr>
          <TablePagination
            sx={{ borderBottom: 'none' }}
            rowsPerPageOptions={totalCount}
            count={
              pageSize === 100
                ? pageCount * 100
                : pageSize === 60
                ? pageCount * 60
                : pageSize === 25
                ? pageCount * 25
                : pageSize === 10
                ? pageCount * 10
                : pageCount
            }
            colSpan={8}
            rowsPerPage={pageSize}
            page={page}
            labelRowsPerPage=''
            SelectProps={{
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </tr>
      </tbody>
    </table>
  );
}

function CustomFooter() {
  return (
    <GridFooterContainer sx={{ display: 'flex', justifyContent: 'end' }}>
      <CustomPagination2 />
    </GridFooterContainer>
  );
}

const GridTable = ({ path, title, isReloadData, prefix, columns, service, id, ids,rowData,noInfo }) => {
  const dispatch = useDispatch();
  const language = localStorage.getItem('i18nextLng');
  const [sizeData, setSizeData] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEliminated, setIsEliminated] = useState(false);
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [pageSizes, setPageSizes] = useState(10);
  const [valor1, setValor] = useState([]);
  const [valorWRows, setValorRows] = useState([]);
  const [isReload, setIsReload] = useState(false);

  const {
    loading,
  } = useSelector((state) => state.immvisasItems);

  const handleDelete = async () => {
    for (const row of selectedRows) {
      try {
        const res = await dispatch(deleteRecord(path, row.id));
        if (res.status === 200) {
          setOpenModal(false);
          setIsReload(true);
        }
        setOpenModal(false);
      } catch (error) {
        console.error('Error al eliminar registro:', row.id, error);
      }
    }
  };

  function CustomHeader() {
    return (
      <GridFooterContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ paddingLeft: '15px' }} variant='h6'>
            {title}
          </Typography>
          {isEliminated && (
            <IconButton
              onClick={(event) => {
                setOpenModal(true);
              }}
              size='small'
              aria-label='delete'
              color='error'
            >
              <DeleteIcon sx={{ marginLeft: '8px' }} fontSize='small' />
            </IconButton>
          )}
        </Grid>
        { valor1?.length > 10 || rowData?.length > 10 ?
        <CustomPagination2 />  : null}
      </GridFooterContainer>
    );
  }
  const getInfo = async () => {
    const body = [];
    setIsLoading(true);

    const commonKeys = [
      'name',
      'last_name',
      'created_at',
      'email',
      'mobile_phone',
      'updated_at',
      'id',
      'title',
      'amount',
      'start_date',
      'amount_expected',
      'amount_received',
      'subject',
      'payment_date',
      'payment_no',
      'description',
      'name',
      'agent',
      'proposal_date',
      'age',
      'ticket_no',
      'date_of_birth',
      'overall_cost',
      'status',
      'first_name',
      'last_name',
      'commercial_name',
      'username',
      'active',
      'price',
      'avatar',
      'all_items_count',
      'completed_items_count',
      'open_items_count',
      'contact_full_name',
      'commercial_name',
      'contact_full_name',
      'contact_email',
      'website',
      'position_title',
      'number',
      //'category'

    ];

    const specificKeys = [
      'candidate_id',
      'assigned_to',
      'client_id',
      'status_id',
      'category_id',
      'role_id',
      'type_id',
      'response_id',
      'school_registration_id',
      'ticket_id',
      'checklist_id',
      'required_to',
      'school_id',
      'schoolprogram_id',
      'student_id',
      'employer_id',
      'category'
    ];

    let response, data;

    if (prefix) {
      response = await dispatch(getPagination(path, 100));
      data = response?.data;
    } else {
      response = await dispatch(service(id));
      data = response?.data;
    }
    if (data) {
      Object.values(data).forEach((item) => {
        const newItem = {};
        Object.entries(item).forEach(([key, value], index) => {
          if (commonKeys.includes(key)) {
            if (key === 'created_at' || key === 'updated_at') {
              newItem[key] = value;
            } else {
              newItem[key] = t(value);
            }
          } else if (specificKeys.includes(key)) {
            if (key === 'school_id') {
              newItem[key] = value?.value?.name;
            }
            if (key === 'category') {
              newItem[key] = value?.name;
            } else{
            newItem[key] = t(value?.value);
            }
          }
        });
        body.push(newItem);
        setValor(body);
      });
    }

    setIsLoading(false);
  };

  const handleDataExist = ()=> {
    setValorRows(rowData)
  }
  useEffect(() => {
    if (!rowData) {
      getInfo();
    }else{
      handleDataExist()
    }
    setIsReload(false);
    setIsLoading(false);
  }, [pageSizes, isReload, isReloadData,loading,ids,language,rowData]);


  return (
   
    <Box sx={{ width: '100%' }}>
         {loading && <Loader />} 
      <ModalAlert
        onSubmit={handleDelete}
        open={openModal}
        onClose={setOpenModal}
        title={t('delete')}
      />
     {valor1?.length > 0 || rowData?.length > 0?
     
      <DataGrid
        sx={{ float: 'center' }}
        autoHeight
        columns={columns}
        rows={rowData ? rowData : valor1}
        pageSize={pageSizes} //filas en tabla
        onPageSizeChange={(newPage) => setPageSizes(newPage)}
        experimentalFeatures={{ newEditingApi: true }}
        loading={isLoading}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rowData
            ? rowData?.filter((row) => selectedIDs.has(row.id))
            : valor1?.filter((row) => selectedIDs.has(row.id));
          selectedRows.length > 0 ? setIsEliminated(true) : setIsEliminated(false);
          setSelectedRows(selectedRows);
        }}
        localeText={{
          columnMenuFilter: t('filter'),
            columnMenuSortAsc: t('ascending_order'),
            columnMenuSortDesc: t('descending_order'),
            columnMenuHideColumn: t('hide_column'),
            columnMenuShowColumns: t('show_columns'),
            columnMenuUnsort: t('without_changes'),
        }}
        components={
          valor1?.length > 10 || rowData?.length > 10
            ? {
                Toolbar: CustomHeader,
                Footer: CustomFooter,
              }
            : { Toolbar: CustomHeader,
            Pagination:()=> null}
        }
      />
    : <Box> 
    <Typography sx={{ paddingLeft: '15px' }} variant='h6'>
            {title}
          </Typography>
    <Typography sx={{ paddingLeft: '15px' }} variant='h5'>{noInfo}</Typography> <hr/>
    </Box>}
    </Box>
    
  );
};

export default GridTable;
