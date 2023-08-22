import { Avatar, Box, Button, Card, Grid, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const PopoverField = ({ values = [], title,setContactId }) => {
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

  const handleOnclick =(e)=>{
    console.log('eeeee',e.target.id)
    console.log('eeeee2322222',e)
    const id = e.target.id
    setContactId(id)
 //return <Link to={`/chat/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}/>
    navigateTo('/chat')

  }

  return (
    <Grid>
      <Typography onClick={(e) => handlePopoverOpen(e)} sx={{ cursor: 'pointer' }}>
        {t(title)}
      </Typography>
      <>
        <Popover
          open={openPopup}
          anchorReference='anchorPosition'
          anchorPosition={{ top: 200, left: 450 }}
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
              width: '300px',
              //height: '100%',
            },
          }}
        >
          <Box onClick={handlePopoverClose} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ ml: 0.5, mr: 0.5, p: 0 }} variant='outlined' color='error' size='small'>
              X
            </Button>
          </Box>
          <Grid item sx={{ ml: 1, mr: 1 }}>
            <Typography variant='h6'sx={{textAlign:'center'}}>{t(title)}</Typography>
            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
              {values &&
                values?.map((item, index) => (
               
                  <Grid
                    sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}
                    key={index}
                  >
                  {console.log("item",item)}
                  <Typography>
                    {item?.user?.name} {item?.user?.last_name}  {item?.at}
                  </Typography>
                    {/* <Button name={item.number} id={index} onClick={()=>{    navigateTo(`/chat/${item.number}/${item.name}`)}} >
                    <Avatar alt='user_photo' src={''} />
                    <Grid>
                      <Typography>{item.name && `${item?.name}`}</Typography>
                      <Typography>{`${item?.number}`}</Typography>
                      </Grid>
                    </Button> */}
                  </Grid>

                ))}
            </Grid>
          </Grid>
        </Popover>
      </>
    </Grid>
  );
};

export default PopoverField;
