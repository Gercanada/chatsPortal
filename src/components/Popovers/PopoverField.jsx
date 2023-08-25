import { Avatar, Box, Button, Card, Grid, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';

const PopoverField = ({ values = [], title, setContactId, type, icon,onClick,id }) => {
  // console.log('values', values);
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [modalValues, setModalValues] = useState(null);
  const [openPopup, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigateTo = (url) => {
    navigate(url);
  };

  const handlePopoverOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Typography onClick={(e) => handlePopoverOpen(e)} sx={{ cursor: 'pointer' }}>
        <Typography variant='p' sx={{ textAlign: 'center' }}>
          {title && icon ? icon : t(title)}
        </Typography>
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
              width: '230px',
              height: '150px',
            },
          }}
        >
          <Box onClick={handlePopoverClose} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ ml: 0.5, mr: 0.5, p: 0 }} variant='outlined' color='error' size='small'>
              X
            </Button>
          </Box>
          <Grid item sx={{ ml: 1, mr: 1 }}>
            <Typography variant='h6' sx={{ textAlign: 'center' }}>
              {t(title)}
            </Typography>
            {type === 'users' ? (
              <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                {values &&
                  values?.map((item, index) => (
                    <Grid sx={{ display: 'flex', flexDirection: 'row', mb: 1 }} key={index}>
                      <Typography>
                        {item?.user?.name} {item?.user?.last_name} {item?.at}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            ) : type === 'files' ? (
              <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                {values &&
                  values?.map((item, index) => (
                    <Grid sx={{ display: 'flex', flexDirection: 'row', mb: 1 }} key={index}>
                      <Typography>
                        {t('file')}:
                        <a href={`${item}`} download>
                          {item}
                        </a>
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            ) : type === 'color' ? (
              <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                {values &&
                  values?.map((item, index) => (
                    <Grid sx={{ display: 'flex', flexDirection: 'row', mb: 1 }} key={index} >
                      <Grid
                        className={'circle'}
                        sx={{ backgroundColor: item?.color, textAlign: 'center', m: 1 }}
                        onClick={()=>{onClick(id,item.id),setOpen(false)}}
                      />
                      <Typography sx={{mt:2}}>
                        {item?.name}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Popover>
      </>
    </Grid>
  );
};

export default PopoverField;
