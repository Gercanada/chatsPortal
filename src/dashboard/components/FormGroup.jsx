import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/Navigation/GoBack';
import { DashboardLayout } from '../layouts/DashboardLayout';

export const FormGroup = ({ children }) => {
  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  return (
    <DashboardLayout>
      <Grid item xs={12}>
        
        <GoBack back={onNavigateBack} />
      </Grid>
      {children}
    </DashboardLayout>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
