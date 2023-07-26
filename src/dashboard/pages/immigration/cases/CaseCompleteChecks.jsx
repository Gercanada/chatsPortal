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
import { useNavigate, useOutletContext } from 'react-router-dom';
import GridTable from '../../../../components/Tables/GridTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerticalTabs from '../../../components/VerticalTabs';
import { Summary2 } from '../../../components/Summary2';
import { Loader } from '../../../../components/Loader';
import { createImmvisasItem, getDetailsByIdForTable } from '../../../../store/slices/immvisas/items';
import ProgressModal from '../../../../components/Modal/ProgressModal';
import DropZoneModal from '../../../../components/Modal/DropZoneModal';

const CaseCompleteChecks = () => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, details] = useOutletContext();
  
  const [ids, setIds] = useState();
  const [showTabs, setShowTabs] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [idsFile, setIdsFile] = useState('');

  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.immvisasItems);


  return (
    <Grid container spacing={3} sx={{ flexDirection: 'row' }}>
      {loading && <Loader />}
      {loading && <ProgressModal open={openModal2} loading={loading} />}
      <Grid item>
        <VerticalTabs
          title={'Checklist'}
          path={'checklists/completed'}
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
              {/* <Typography>{t('reply')}</Typography> */}
              <Typography variant='h6'>{t('documents')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12} sx={{ marginBottom: '5px' }}>
                <GridTable
                  path={`/checklists/${ids}/items/active`}
                  title={t('pending_items')}
                  group='/checklists'
                  noInfo={t('no_pending_items')}
                  prefix='checkList'
                  columns={[
                    // { field: 'id', headerName: 'ID', width: 100, align: 'center', sortable: false },
                    {
                      field: 'subject',
                      headerName: t('subject'),
                      sortable: false,
                      flex: 1,
                      align: 'center',
                    },
                    // {
                    //   field: 'category',
                    //   headerName: t('category_id'),
                    //   sortable: false,
                    //   width: 210,
                    //   align: 'center',
                    // },
                    {
                      field: 'item_status',
                      headerName: t('item_status'),
                      flex: 1,
                      align: 'center',
                      sortable: false,
                    },
                    // {
                    //   field: 'clitemsno',
                    //   headerName: t('clitemsno'),
                    //   width: 250,
                    //   align: 'center',
                    //   sortable: false,
                    // },

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
                    // { field: 'id', headerName: 'ID', width: 100, align: 'center', sortable: false },
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
                    // {
                    //   field: 'clitemsno',
                    //   headerName: t('clitemsno'),
                    //   width: 210,
                    //   align: 'center',
                    //   sortable: false,
                    // },
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
              {/* <Typography>{t('reply')}</Typography> */}
              <Typography variant='h6'>Eforms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                <GridTable
                  ids={ids}
                  path={`/checklists/${ids}/eforms/active`}
                  title={t('pending_eforms')}
                  //group='/checklists'
                  noInfo={t('no_pending_eforms')}
                  prefix='checkList'
                  columns={[
                    // { field: 'id', headerName: 'ID', width: 100, align: 'center', sortable: false },
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
                        // console.log('params', params),
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
                  group='/eforms'
                  noInfo={t('no_completed_eforms')}
                  prefix='eforms'
                  columns={[
                    // { field: 'id', headerName: 'ID', width: 100, align: 'center', sortable: false },
                    // {
                    //   field: 'eforms_no',
                    //   headerName: t('eforms_no'),
                    //   width: '110',
                    //   align: 'center',
                    //   sortable: false,
                    // },

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
                        // console.log('params', params),
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
    </Grid>
  );
};

export default CaseCompleteChecks;
