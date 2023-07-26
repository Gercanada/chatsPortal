import {
  Button,
  ButtonGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useFetchApi } from '../hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { exportAsTemplate, htmlToEdit } from '../../store/slices/form/thunks';
import { EditOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Loader } from '../../components/Loader';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import WebIcon from '@mui/icons-material/Web';
import moment from 'moment';
import EditModal from './EditModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
};

export const ExportModal = ({ x, y }) => {
  const selectFrom = typeof x !== 'undefined' ? `select?type_id=${x}` : 'select';
  const { loading, response } = useFetchApi(`/resource/document-templates/${selectFrom}`);
  const [selection, setSelection] = useState(0);
  const [modalContent, setModalContent] = useState(0);
  const [preview, setPreview] = useState('');
  const [blobUrl, setBlobUrl] = useState(null);
  const [exportButton, setExportButton] = useState(false);

  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  const print = () => {
    setExportButton(true);
    if (!(typeof x === 'undefined' && typeof y === 'undefined')) {
      dispatch(exportAsTemplate({ x: selection, y }))
        .then((res) => {
          setPreview(res?.data);
          const file = new Blob([res?.data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          setBlobUrl(fileURL);
          setModalContent(1);
          // if (res.status === 200 || res.status === 201) navigateTo(path);
        })
        .catch((error) => {
          console.log(error);
        });
      //
    }
  };

  const tempOptions = [];

  if (response && Object.keys(response).length > 0) {
    const a = response?.response || {};
    Object.values(a).forEach((option, i) => {
      tempOptions.push(
        <MenuItem key={i} value={option.id}>
          {option?.name}
        </MenuItem>,
      );
    });
  }

  const handleOpen = () => {
    setModalContent(0);
    setExportButton(false);
    setOpen(true);
  };

  const previewPage = () => {
    if (blobUrl) window.open(blobUrl);
  };

  const downloadFile = () => {
    if (blobUrl) {
      const link = document.createElement('a'); // Or maybe get it from the current document
      link.href = blobUrl;
      link.download = `${moment().format('YYYY-MM-DD_h.mm.ss')}.pdf`;
      link.click();
    }
  };

  const printBlob = () => {
    if (blobUrl) {
      const iframe = document.getElementById('iframe_preview');
      iframe.focus();
      iframe.contentWindow.print();
    }
  };

  const editDoc = () => {
    setModalContent(2);
    if (!(typeof x === 'undefined' && typeof y === 'undefined')) {
      dispatch(htmlToEdit({ x: selection, y }))
        .then((res) => {
          //! Here modal preview be open
          setPreview(res?.data);
          const file = res?.data; // new Blob([res?.data], { type: 'application/pdf' });
          // const fileURL = URL.createObjectURL(file);
          // setBlobUrl(fileURL);
          // setModalContent(1);
          // if (res.status === 200 || res.status === 201) navigateTo(path);
        })
        .catch((error) => {
          console.log(error);
        });
      //
    }
  };

  const getContentModal = () => {
    switch (modalContent) {
      case 0:
        return (
          <>
            <Box>
              <InputLabel id={1}>Seleccionar plantilla</InputLabel>
              {loading && <Loader />}
              <Select
                sx={{ width: '100%' }}
                defaultValue={1}
                name='template'
                label='Seleccionar plantilla'
                onChange={handleChange}
                value={selection}
              >
                {tempOptions}
              </Select>
            </Box>
            <Box xs={12}>
              <LoadingButton
                size='large'
                color='primary'
                onClick={print}
                endIcon={<PictureAsPdfIcon />}
                disabled={exportButton}
                loading={exportButton}
                loadingPosition='end'
                variant='contained'
                style={{ marginTop: '10px', width: '100%' }}
              >
                <Typography sx={{ color: 'primary' }}>Exportar</Typography>
              </LoadingButton>

              {/*       <Button
              disabled={exportButton}
              loading={exportButton}
              color='primary'
              size='large'
              style={{ marginTop: '10px', width: '100%' }}
              onClick={print}
            >
              <Typography sx={{ color: 'primary' }}>
                <PictureAsPdfIcon />
                Exportar
              </Typography>
            </Button> */}
            </Box>
          </>
        );
      case 1:
        return (
          <>
            {loading && <Loader />}
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Preview
            </Typography>
            <Box xs={12} sx={{ border: 'solid red 1px' }}>
              <iframe id='iframe_preview' src={blobUrl} style={{ width: '100%', height: 280 }} />
            </Box>
            <Box xs={12}>
              <ButtonGroup
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  marginTop: '30px',
                  marginBottom: '30px',
                }}
                variant='contained'
                aria-label='outlined primary button group'
              >
                <Button
                  sx={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                  color='primary'
                  size='large'
                  onClick={downloadFile}
                >
                  <CloudDownloadIcon />
                  <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>Download file</Typography>
                </Button>
                <Button
                  sx={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                  color='primary'
                  size='large'
                  onClick={printBlob}
                >
                  <PrintIcon />
                  <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>Print file</Typography>
                </Button>
                <Button
                  sx={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                  color='primary'
                  size='large'
                  onClick={() => editDoc()}
                >
                  <EditOutlined />
                  <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>Edit file</Typography>
                </Button>
                <Button
                  sx={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                  color='primary'
                  size='large'
                  // onClick={(event) => navigateTo(i.navigateTo)}
                  // disabled={location.pathname === i.navigateTo}
                >
                  <SendIcon />
                  <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>Send as email</Typography>
                </Button>
                <Button
                  sx={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                  color='primary'
                  size='large'
                  // onClick={(event) => navigateTo(i.navigateTo)}
                  // disabled={location.pathname === i.navigateTo}
                  //! Save as document on api STORAGE
                >
                  <SaveIcon />
                  <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>
                    Save as document
                  </Typography>
                </Button>
                <Button
                  sx={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                  color='primary'
                  size='large'
                  onClick={previewPage}
                  // disabled={location.pathname === i.navigateTo}
                >
                  <WebIcon />
                  <Typography sx={{ color: 'success', paddingLeft: '10px' }}>
                    Preview in new page
                  </Typography>
                </Button>
              </ButtonGroup>
            </Box>
          </>
        );
      case 2:
        return <EditModal response={response} />;
      default:
        return 'EMPTY';
    }
  };

  const modalbody = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Exportar como pdf
        </Typography>
        {getContentModal()}
      </Box>
    </Modal>
  );

  return { handleOpen, modalbody };
};
