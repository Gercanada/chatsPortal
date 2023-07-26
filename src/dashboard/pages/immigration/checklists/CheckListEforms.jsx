import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import GridTable from '../../../../components/Tables/GridTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Loader } from '../../../../components/Loader';

const CheckListEforms = () => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, details] = useOutletContext();
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.pagination);
  return (
    <Grid container spacing={3} sx={{ flexDirection: 'row' }}>
      {/* <Grid item xs={10} sx={{ marginLeft: '10%' }}>
        <Summary />
      </Grid> */}

      <Grid
        item
        sx={{ marginTop: '10px', marginBottom: '10px', marginLeft: '5px', marginRight: '5px' }}
        xs={12}
        md={12}
      >
        <Accordion defaultExpanded sx={{ paddingBottom: '50px', marginBottom: '20px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            {/* <Typography>{t('reply')}</Typography> */}
            <Typography variant='h5'>Eforms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item xs={12}>
              <GridTable
                path={`checklists/${id}/eforms/active`}
                title={t('pending_eforms')}
                noInfo={t('no_pending_eforms')}
                group='/checklists'
                prefix='checkList'
                columns={[

                  {
                    field: 'status',
                    headerName: t('status'),
                   
                    flex: 1,
                    align: 'center',
             
                    sortable: false,
                  },
                  {
                    field: 'description',
                    headerName: t('description'),
             
                    align: 'center',
                    flex: 1,
             
                    sortable: false,
                  },
                  {
                    field: 'e_form_link',
                    headerName: t('e_form_link'),

                    flex: 1,
                    align: 'center',
                    sortable: false,
                    renderCell: (params) => (
                      params.value !== "-"?  <a href={params.value} target="_blank">{params.value}</a> :<p>-</p>
                    ),
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <GridTable
                path={`checklists/${id}/eforms/submitted`}
                title={t('submitted_eforms')}
                noInfo={t('no_completed_eforms')}
                group='/checklists'
                prefix='checkList'
                columns={[
                  {
                    field: 'status',
                    headerName: t('status'),
                    flex: 1,
                    align: 'center',
                    sortable: false,
                  },
                  {
                    field: 'description',
                    headerName: t('description'),
                    flex: 1,
                    align: 'center',
                    sortable: false,
                  },
                  {
                    field: 'e_form_link',
                    headerName: t('e_form_link'),
                    flex: 1,
                    align: 'center',
                    sortable: false,
                    renderCell: (params) => (
                      params.value !== "-"?  <a href={params.value} target="_blank">{params.value}</a> :<p>-</p>
                    ),
                  },
                ]}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
        {loading && <Loader />}
      </Grid>
      <Grid item sx={{ marginBottom: '50px' }} xs={12} md={8}></Grid>
    </Grid>
  );
};

export default CheckListEforms;
