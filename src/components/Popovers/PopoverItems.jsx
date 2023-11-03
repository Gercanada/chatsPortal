import { Avatar, Box, Button, Card, Grid, Popover, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { useForm } from 'react-hook-form';
import PreviewModal from '../Modal/PreviewModal';
import { getUserChat } from '../../store/slices/whatsApp/thunks';

const PopoverItems = ({
  values = [],
  title,
  setContactId,
  type,
  icon,
  onClick,
  id,
  attachments,
}) => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [modalValues, setModalValues] = useState(null);
  const [openPopup, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [attachmentFile, setAttachmentFile] = useState(false);


  const navigateTo = (url) => {
    navigate(url);
  };
  const {
    control,
    formState: { errors },
    setValue,
    onInputChange,
    watch,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {},
  });
  const handlePopoverOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAttachmentFile(selectedFile);
      setOpenModal(true);

      console.log(selectedFile);
    }
  };

  return (
    <Grid>
      <Typography
        variant='p'
        onClick={(e) => handlePopoverOpen(e)}
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        <Typography sx={{ textAlign: 'center' }}>{title && icon ? icon : t(title)}</Typography>
      </Typography>
      <>
        <Popover
          open={openPopup}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          PaperProps={{
            sx: {
              //width: '230px',
              // height: '150px',
            },
          }}
        >
          <Box onClick={handlePopoverClose} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ m: 0.5, p: 0 }} variant='outlined' color='error' size='small'>
              X
            </Button>
          </Box>
          <Grid item sx={{ ml: 1, mr: 1, display: 'flex', flexDirection: 'column' }}>
            {attachments.map((attach,index) => (
              <Grid sx={{ display: 'flex', flexDirection: 'row' }} key={index}>
                <TextField
                  // inputProps={{ accept: `${attach.type}` }}
                  style={{ display: 'none' }}
                  id='raised-button-file'
                  multiple
                  type='file'
                  onChange={handleFileChange}
                />
                <label htmlFor='raised-button-file'>
                  <Button
                    sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                    variant='raised'
                    component='span'
                  >
                    <Typography sx={{}}>{attach.icon}</Typography>
                    <Typography>{attach.attachment}</Typography>
                  </Button>
                </label>
              </Grid>
            ))}

          </Grid>
          <PreviewModal attachmentFile={attachmentFile} open={openModal} onClose={setOpenModal} />
        </Popover>
      </>
    </Grid>
  );
};

export default PopoverItems;
