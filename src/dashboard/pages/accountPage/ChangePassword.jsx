import { Grid } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [id, details, { type }] = useOutletContext();
    
    const [data, setData] = useState([details])
    const [showTabs, setShowTabs] = useState(false);
  
   
  return (
    < >
    <Grid   sx={{mt: 1, mb: 1}} container flexDirection='row'>
    <Grid item  xs={12} spacing={2}>
          <h1>Hola</h1>
     </Grid>
    </Grid>
    </>
  )
}

export default ChangePassword
