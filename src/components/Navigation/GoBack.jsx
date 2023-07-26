import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Card, Grid, IconButton } from '@mui/material';

const GoBack = ({ back, gridItemStyle }) => (
  
  <Grid item xs={12} md={12} sm={12} lg={12} style={{ textAlign: 'left', ...gridItemStyle }}>
    <IconButton onClick={back}>
      <KeyboardBackspaceIcon fontSize='large' />
    </IconButton>
  </Grid>
);

export default GoBack;
