import { Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { getChecklistByIdDetails } from '../../store/slices/checklists';


export const Summary = () => {
  const [id, details] = useOutletContext();
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const onLoad = () => {
    if (details) {
      const arr = Object.entries(details).map(([key, value]) => ({ key, value }));
      setData(arr);
    }
  };

  useEffect(() => {
    onLoad();
  }, [details]);

  return (
    <>
      <Card sx={{ mt: 1 }}>
        {data?.map((item,index) => (
            <React.Fragment key={index}>
            {item?.key !== 'case' && item?.key !== 'checklist_type' && item?.key !== 'cf_1199'  && item?.key !== 'items_count' && item?.key !== 'eforms_count'  && item?.key !== '%_completed'?
          <Grid sx={{ display: 'flex', mt: 1, mb: 1, borderBottom: '1px solid #c0c0c0' }} container>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={6}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                
                {t(item.key)}
              </Typography>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={6}>
              <Typography variant='p'>{ item.value === "" ? "-" : item.value}</Typography>
            </Grid>
          </Grid>
            :''}
       </React.Fragment>
        ))}
      </Card>
    </>
  );
};
