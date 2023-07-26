import { Grid, Stack, Table, TableCell,makeStyles, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, useTheme, Paper, Button, Input, FormControl, TextField } from '@mui/material';
import { Box } from '@mui/system';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableBody } from 'semantic-ui-react';
import { getPagination } from '../../store/slices/pagination/thunks';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import FilterListIcon from '@mui/icons-material/FilterList';
import './tableStyles.css'

function TablePaginationActions(props) {
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
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <Typography variant='caption'>
      {`Page ${page + 1} of ${Math.ceil(count / rowsPerPage)}`}
      </Typography>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const TableComponent = ({ path, title, group, prefix, columns }) => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.pagination);
  const { isLightTheme } = useSelector((state) => state.ui);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount,setTotalCount]= useState();
  const [search, setSearch]= useState('')
  const [targetName, setTargetName]=useState('')

  const valuesTable = pagination?.response?.data;
  const dataCounter = pagination?.pagination?.total;
  const algo = Object.values(valuesTable || {});

  const getInfo = async () => {
     const response = await dispatch(getPagination(path, page, rowsPerPage));
     if(response?.pagination?.total >= 100){
      setTotalCount([10,25,60,100])
    }else if(response?.pagination?.total <=30){
      setTotalCount([10,response?.pagination?.totalt])
    }else if(response?.pagination?.total > 25 && response?.pagination?.total < 100 ){
      setTotalCount([10,30,response?.pagination?.total])
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const onChange=(e)=>{
    const targetNames = e.target.name;
    setTargetName(targetNames);
    setSearch(e.target.value);
  }

  useEffect(() => {
    getInfo();
   
  }, [page,rowsPerPage]);

  return (
    <Box>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography sx={{padding:"10px"}} variant='h6'>
         {title}
      </Typography>
          <Button
            sx={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', float: 'right' }}
            size='large'
            color='iconverde'
            onClick={(event) => {
            //navigate(`/admin/contacts/create`);
            //  setOpenModal(true)
            }}
          >
            <Typography sx={{ paddingRight: '10px' }} color='white' variant='h2'>
              {/* {t('create_contact')}hvhjgv */}New Contact
            </Typography>
             <NoteAddIcon color='iconw'></NoteAddIcon> 
          </Button>
        </Grid>
      <TableContainer>
      <Grid sx={{display:'flex', justifyContent:'end'}}>
       <TablePagination
       sx={{borderBottom:'none'}}
              rowsPerPageOptions={totalCount}
              count={dataCounter}
              colSpan={8}
              rowsPerPage={rowsPerPage}
               page={page}
               labelRowsPerPage=''
              SelectProps={{
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
            </Grid>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <TableCell sx={{textAlign:'center'}}>
                {item} 
                <TextField
                name={item}
                onChange={onChange}
                //  inputProps={}
                InputProps={{
                     endAdornment: <FilterListIcon/>
                     }}
                />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {algo &&
              algo.filter((item)=>{ return search.toLowerCase === ''
               ? item 
               : targetName === 'id'
               ? item.id.toString().includes(search)
               : targetName === 'name'
               ? item.name?.toLowerCase().includes(search)
               : targetName === 'last_name'
               ? item.last_name?.toLowerCase().includes(search) 
               : targetName === 'assigned_to'
               ? item.assigned_to?.value?.toLowerCase().toString().includes(search) 
               : targetName === 'created_at'
               ? item.created_at?.toString().includes(search)
               : targetName === 'email'
               ? item.email?.toLowerCase().toString().includes(search) 
               : targetName === 'mobile_phone'
               ? item.mobile_phone?.toString().includes(search) 
               : targetName === 'updated_at'
               ? item.updated_at?.toString().includes(search)  
               : 'hola' }).map((item, index) => (
                <TableRow  key={index}>
                  <TableCell sx={{textAlign:'center'}}>{item.id}</TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    <RouterLink
                      style={{ color: isLightTheme ? 'blue' : '#16CDFF' }}
                      to={`${group}/${item.id}`}
                    >
                      {item.name}
                    </RouterLink>
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    <RouterLink
                      style={{ color: isLightTheme ? 'blue' : '#16CDFF' }}
                      to={`${group}/${item.id}`}
                    >
                      {item.last_name}
                    </RouterLink>
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}} >{item.created_at}</TableCell>
                  <TableCell sx={{textAlign:'center'}} >{item.updated_at}</TableCell>
                  <TableCell sx={{textAlign:'center'}}>{item.email}</TableCell>
                  <TableCell sx={{textAlign:'center'}}>{item.mobile_phone}</TableCell>
                  <TableCell sx={{textAlign:'center'}}>{item.assigned_to.value}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={totalCount}
              count={dataCounter}
              colSpan={8}
              rowsPerPage={rowsPerPage}
               page={page}
               labelRowsPerPage=''
              SelectProps={{
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>

    </Box>
  );
};
export default TableComponent;
