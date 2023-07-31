import { Avatar, Box, Button, Card, Grid, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PopoverField = ({ values = [], title }) => {
  console.log('values', values);
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [modalValues, setModalValues] = useState(null);
  const [openPopup, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Typography
        onClick={(e) => handlePopoverOpen(e)}
        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        variant='p'
      >
        + {t(title)}
      </Typography>
      <>
        <Popover
          open={openPopup}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          PaperProps={{
            sx: {
              width: '230px',
              height: '100%',
            },
          }}
        >
          <Box onClick={handlePopoverClose} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ ml: 0.5, mr: 0.5, p: 0 }} variant='outlined' color='error' size='small'>
              X
            </Button>
          </Box>
          <Grid item sx={{ ml: 1, mr: 1 }}>
            <Typography variant='p'>{t(title)}</Typography>
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              {values &&
                values.map((item, index) => {
                    console.log('itemeeee',item.name),
                  <Card sx={{ display: 'flex', flexDirection: 'row' }} key={index}>
                    <Avatar alt='user_photo' src={''} />
                    <Typography>
                    k
                      {item.name}
                      {item.last_name}
                    </Typography>
                  </Card>
                })}
            </Grid>
          </Grid>
        </Popover>
      </>
    </Grid>
  );
};

export default PopoverField;
