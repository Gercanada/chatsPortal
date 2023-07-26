import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import GridTable from '../../../../components/Tables/GridTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerticalTabs from '../../../components/VerticalTabs';
import { Summary2 } from '../../../components/Summary2';
import {
  createImmvisasItem,
  deleteFileItem,
  getDetailsByIdForTable,
  sendFilesItem,
} from '../../../../store/slices/immvisas/items';
import DropZoneModal from '../../../../components/Modal/DropZoneModal';
import { Loader } from '../../../../components/Loader';
import ProgressModal from '../../../../components/Modal/ProgressModal';

const CasePendingChecks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, details] = useOutletContext();

  const [openModal2, setOpenModal2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [ids, setIds] = useState(0);

  const [idsFile, setIdsFile] = useState('');
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.immvisasItems);
  const { isLightTheme } = useSelector((state) => state.ui);

  return (
    <Grid container spacing={3}
      sx={loading ? { display: 'none' } :{
        flexDirection: 'row'
        }}>
      {loading && <Loader />}
      {loading && <ProgressModal open={openModal2} loading={loading} />}
      <Grid item
      >
        <VerticalTabs
          title={'Checklist'}
          path={'checklists/active'}
          id={id}
          setShowTabs={setShowTabs}
          setIds={setIds}
        />
      </Grid>
      {showTabs && (
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
              <Typography variant='h6'>{t('documents')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12} sx={{ marginBottom: '5px' }}>
                <GridTable
                  ids={ids}
                  path={`checklists/${ids}/items/active`}
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
                          sx={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }}
                        >
                          {params.row.files.length > 0 ? (
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
                                setIdsFile(params.id), setOpenModal(true);
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
                  id={idsFile.slice(3)}
                />
              </Grid>
              <Grid item xs={12}>
                <GridTable
                  ids={ids}
                  path={`checklists/${ids}/items/submitted`}
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
          <Accordion defaultExpanded sx={{ paddingBottom: '50px', marginBottom: '20px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h6'>Eforms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                <GridTable
                  path={`/checklists/${ids}/eforms/active`}
                  title={t('pending_eforms')}
                  noInfo={t('no_pending_eforms')}
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
                      renderCell: (params) =>
                        params.value !== '-' ? (
                          <a href={params.value} target='_blank'>
                            {params.value}
                          </a>
                        ) : (
                          <p>-</p>
                        ),
                    },
                  ]}
                />
                <GridTable
                  path={`checklists/${ids}/eforms/submitted`}
                  title={t('submitted_eforms')}
                  noInfo={t('no_completed_eforms')}
                  group='/eforms'
                  prefix='eforms'
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
                      renderCell: (params) =>
                        params.value !== '-' ? (
                          <a href={params.value} target='_blank'>
                            {params.value}
                          </a>
                        ) : (
                          <p>-</p>
                        ),
                    },
                  ]}
                />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      )}
      <Grid item sx={{ marginBottom: '50px' }} xs={12} md={8}></Grid>
    </Grid>
  );
};

export default CasePendingChecks;
