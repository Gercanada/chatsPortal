import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GridTable from '../../../../components/Tables/GridTable';
import { useDispatch, useSelector } from 'react-redux';
import DropZoneModal from '../../../../components/Modal/DropZoneModal';
import {
  createImmvisasItem,
  deleteFileItem,
  getDetailsByIdForTable,
  sendFilesItem,
} from '../../../../store/slices/immvisas/items';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Summary } from '../../../components';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Loader } from '../../../../components/Loader';
import ProgressModal from '../../../../components/Modal/ProgressModal';
import { useEffect } from 'react';

export const CheckPendingItems = () => {
  const [openModal, setOpenModal] = useState(false);
  const [ids, setId] = useState('');
  const { loading } = useSelector((state) => state.immvisasItems);

  const { isLightTheme } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal2, setOpenModal2] = useState(false);
  const [id, details] = useOutletContext();
  const { t } = useTranslation();

  const getShowData = async () => {
    if (id) {
      await dispatch(getDetailsByIdForTable(id));
    }
  };

  useEffect(() => {
    getShowData();
  }, [id]);

  return (
    <Grid container spacing={3} sx={{ flexDirection: 'row' }}>
      {loading && <ProgressModal open={openModal2} loading={loading} />}

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
            <Typography variant='h5'>{t('items')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item xs={12}>
              <GridTable
                path={`/checklists/${id}/items/active`}
                title={t('pending_items')}
                noInfo={t('no_pending_items')}
                group='/checklists'
                prefix='checkList'
                columns={[
                  {
                    field: 'subject',
                    headerName: t('subject'),
                    sortable: false,
                    flex: 1,
                    align: 'center',
                  },
                  {
                    field: 'item_status',
                    headerName: t('item_status'),
                    flex: 1,
                    align: 'center',
                    sortable: false,
                  },
                  {
                    field: 'files',
                    headerName: t('files'),
                    flex: 1,
                    align: 'center',
                    sortable: false,
                    renderCell: (params) => (
                      <Typography
                        sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                      >
                        {!Array.isArray(params.row.files) ? (
                          <>
                            <Button
                              onClick={() =>
                                dispatch(sendFilesItem(params.id), setOpenModal2(true))
                              }
                              sx={{ marginRight: '5px' }}
                              color='success'
                            >
                               {t('send')}
                            </Button>
                            <Button
                              onClick={() => dispatch(deleteFileItem(params.id))}
                              sx={{ marginRight: '5px' }}
                              color='error'
                            >
                               {t('delete')}
                            </Button>
                          </>
                        ) : (
                          <Button
                            sx={{ marginRight: '5px' }}
                            color='primary'
                            onClick={() => {
                              console.log('params', params), setId(params.id), setOpenModal(true);
                            }}
                          >
                            {t('upload')}
                          </Button>
                        )}

                        {params?.row.files}
                      </Typography>
                    ),
                  },
                ]}
              />
              <DropZoneModal
                open={openModal}
                onClose={setOpenModal}
                title={t('add_file')}
                service={createImmvisasItem}
                id={ids.slice(3)}
              />
            </Grid>
            <Grid item xs={12}>
              <GridTable
                path={`/checklists/${id}/items/submitted`}
                title={t('submitted_items')}
                noInfo={t('no_completed_items')}
                group='/checklists'
                prefix='checkList'
                columns={[
                  {
                    field: 'subject',
                    headerName: t('subject'),
                    sortable: false,
                    flex: 1,
                    align: 'center',
                  },
                  {
                    field: 'category',
                    headerName: t('category_id'),
                    sortable: false,
                    flex: 1,
                    align: 'center',
                  },
                  {
                    field: 'item_status',
                    headerName: t('item_status'),
                    flex: 1,
                    align: 'center',
                    sortable: false,
                  },
                ]}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {loading && <Loader />}
    </Grid>
  );
};
