import { Button, Card, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { DashboardLayout } from '../../../layouts/DashboardLayout';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TranslatableTable from '../../../components/TranslatableTable';
import { useTranslation } from 'react-i18next';
import GridTable from '../../../../components/Tables/GridTable';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../../../components/Modal/ModalForm';
import { useEffect, useState } from 'react';
import {
  getAssignedIdSelect,
  getTicketIdSelect,
  getTypeIdSelects,
} from '../../../../store/slices/selectsInputs/thunks';
import { createChecklist } from '../../../../store/slices/checklists';
import { Loader } from '../../../../components/Loader';

export const details = [
  { name_: 'Ticket id', key: 'ticket_id', type: 'select', fetch_to: 'resource/clients' },
  { name_: 'Type id', key: 'type_id', type: 'select', fetch_to: 'resource/clients' },
  { name_: 'Assigned to', key: 'assigned_to', type: 'select', fetch_to: 'resource/clients' },
];

export const ChecklistPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLightTheme } = useSelector((state) => state.ui);
  const { loading } = useSelector((state) => state.pagination);
  return (
    <DashboardLayout>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }}>
        <Card  sx={loading ? { display: 'none' } : { marginTop: '10px' }}>
          <GridTable
            path='/checklists/active'
            title={t('active_checklists')}
            noInfo={t('no_active_checklist')}
            group='/checklists'
            prefix='checkList'
            columns={[
              {
                field: 'subject',
                headerName: t('subject'),
                sortable: false,
                renderCell: (params) => (
                  <Link
                    style={
                      isLightTheme === false
                        ? {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            color: 'white',
                          }
                        : { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
                    }
                    to={`/checklist/${params.id}/active/items`}
                  >
                    {params.value}
                  </Link>
                ),
                flex: 1,
                align: 'center',
              },
              {
                field: 'applicant_full_name',
                headerName: t('applicant_full_name'),
                flex: 1,
                align: 'center',
                sortable: false,
              },
              {
                field: 'checklist_type',
                headerName: t('checklist_type'),
                flex: 1,
                align: 'center',
                sortable: false,
              },
              {
                field: '%_completed',
                headerName: t('%_completed'),
                flex: 1,
                align: 'center',
                sortable: false,
              },
            ]}
          />
        </Card>
      </Grid>

      <Card  sx={loading ? { display: 'none' } : { marginTop: '10px' }}>
        <Grid item xs={12}>
          <GridTable
            path='/checklists/completed'
            title={t('completed_checklists')}
            noInfo={t('no_completed_checklist')}
            group='/checklists'
            prefix='checkList'
            columns={[
              {
                field: 'subject',
                headerName: t('subject'),
                sortable: false,
                renderCell: (params) => (
                  <Link
                    style={
                      isLightTheme === false
                        ? {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            color: 'white',
                          }
                        : { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
                    }
                    to={`/checklist/${params.id}/active/items`}
                  >
                    {params.value}
                  </Link>
                ),
                flex: 1,
                align: 'center',
              },
              {
                field: 'applicant_full_name',
                headerName: t('applicant_full_name'),
                flex: 1,
                align: 'center',
                sortable: false,
              },
              {
                field: 'checklist_type',
                headerName: t('checklist_type'),
                flex: 1,
                align: 'center',
                sortable: false,
              },
              {
                field: '%_completed',
                headerName: t('%_completed'),
                flex: 1,
                align: 'center',
                sortable: false,
              },
            ]}
          />
        </Grid>
      </Card>
      {loading && <Loader />}
    </DashboardLayout>
  );
};
