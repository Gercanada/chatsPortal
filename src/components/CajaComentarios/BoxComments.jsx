import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Comment, Container, Form, Header, Loader } from 'semantic-ui-react';
import { useFetchApi } from '../../dashboard/hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createRecord, updateRecord, updateRecordFormData, getComments } from '../../store/slices/form/thunks';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';


export const BoxComments = () => {
  const { t } = useTranslation();
  const { isLightTheme } = useSelector((state) => state.ui);
  const pathName = window.location.pathname;
  const dispatch = useDispatch();

  if (!pathName) return;

  const {show_comments} =useSelector((state) => state.comments);

  const list = show_comments?.data|| [];

  const resource =
    pathName.split('/')[2] === 'cases'
      ? 'tickets'
      : pathName.split('/')[2] === 'contacts'
      ? 'clients'
      : pathName.split('/')[2] === 'users'
      ? 'clients'
      : pathName.split('/')[2];
  const eId = pathName.split('/')[3]; // id



  const { loading } = useFetchApi(`/resource/${resource}/${eId}/comments`);


  const comments = [];
  

  const onSubmit = (event) => {
    const content = event.target.comment_content.value;
    // const reason = event.target.edition_reason.value || null;
    const formData = {};
    formData['content'] = content;
    Object.keys(formData).includes('id')
      ? Object.keys(formData).includes('image')
        ? dispatch(updateRecordFormData(formData, `/resource/${resource}/${eId}/comments`)).then(
            (res) => {
              if (res.status === 200 || res.status === 201);
            },
          )
        : dispatch(updateRecord(formData, `/resource/${resource}/${eId}/comments`)).then((res) => {
            if (res.status === 200 || res.status === 201);
          })
      : dispatch(
          createRecord(formData, `/resource/${resource}/${eId}/comments`, 'application/json'),
        ).then((res) => {
          if (res.status === 200 || res.status === 201);
        });
   getComments2();
  };
  
  const getComments2 = async() => {
  
  }

  useEffect(async () => {
 // getComments2();
 const response2 = await dispatch(getComments(eId))

  }, [])

  // useEffect(() => {
  //   getComments2();
  // }, [])
  
   if (list.length > 0) {
  
    list.map((comment, i) =>
      comments.push(
        <>
          <ListItem alignItems='flex-start' key={i} style={{ position: 'relative' }}>
            <ListItemAvatar>
              <Avatar alt='Remy Sharp' src={`${comment?.avatar}`} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography sx={{ float: 'right', variant: 'span' }}>
                    {comment?.created_at}
                  </Typography>
                  <Typography>{`${comment?.user_id?.value}`} </Typography>
                </>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  ></Typography>
                  <Typography style={{ color: isLightTheme ? 'black' : 'white' }}>
                    {comment?.content}
                  </Typography>

                  <Grid>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography>{t('reply')}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Form reply onSubmit={onSubmit}>
                          <Form.TextArea
                            name='comment_content'
                            style={{
                              color: isLightTheme ? 'black' : 'white',
                              backgroundColor: isLightTheme ? 'white' : '#6b6b6b',
                            }}
                          />
                          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </>
              }
            />
            <br />
          </ListItem>
          <Divider variant='inset' component='li' />
        </>,
      ),
    );
  }

  return (
    <Card
      item
      
      sx={{
        padding: '20px',
        width: '100%',
        // maxWidth: 360,
        maxHeight: '600px',
  
        overflowY: 'visible',
        bgcolor: 'background.paper',

        position: 'relative',
      }}
    >
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
        }}
      >
        {loading ? <Loader /> : comments}
        <Divider variant='inset' component='li' />

        <Form reply onSubmit={onSubmit} sx={{ paddingLeft: '10px' }}>
          <Form.TextArea
            name='comment_content'
            style={{
              color: isLightTheme ? 'black' : 'white',
              backgroundColor: isLightTheme ? 'white' : '#6b6b6b',
            }}
          />
          <Grid flexDirection={'column'} sx={{ display: 'flex', alignItems: 'right' }}>
            <Button
              sx={{ maxWidth: '30px' }}
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
            />
          </Grid>
        </Form>
      </List>
    </Card>
  );
};
