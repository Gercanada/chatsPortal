import { Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

export const Summary2 = () => {
  const [id, details] = useOutletContext();
  const [data, setData] = useState([]);
  const { t } = useTranslation();

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
        {data.map((item,index) => (
          <Grid key={index} sx={{ display: 'flex', mt: 1, mb: 1, borderBottom: '1px solid #c0c0c0' }} container>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={6}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
              {t(item.key)}
              </Typography>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={6}>
              <Typography variant='p'>{ item.value === "" ? "-" : item.value}</Typography>
            </Grid>
          </Grid>
        ))}
      </Card>
    </>
  );
};
