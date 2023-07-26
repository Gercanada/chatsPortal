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
    setIsLoading(true);
    let response;
    if (prefix) {
      response = await dispatch(getPagination(path));
    } else {
      response = await dispatch(service(id));
    }
    const data = response?.data || [];

    console.log('data',data)

    const body = data.map((item) => {
      const newItem = {};
      Object.entries(item).forEach(([key, value], index) => {
        if (
          [
            'subject',
            'checklist_no',
            'applicant_full_name',
            'checklist_type',
            '%_completed',
            'cf_1199',
            'ticket_no',
            'category',
            'id',
            'title',
            'type',
            'cf_1216',
            'status',
            'item_status',
            'original_file_name',
            'clitemsno',
            'eforms_no',
            'pdf_file_link',
            'e_form_link',
            'e_form_type',
            'cf_helpdesk_id',
            'cf_checklist_id',
            'description',
            'completed',
            'On Hold by Client',
          ].includes(key)
        ) {
          newItem[key] = value ? t(value) : '-';
        } else if (['files'].includes(key)) {
          newItem[key] = value?.files;
        }
      });
      return newItem;
    });
    setValor(body);
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
