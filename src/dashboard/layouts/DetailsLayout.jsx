import PropTypes from 'prop-types';
import { DashboardLayout } from './DashboardLayout';

export const DetailsLayout = ({ children }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};
DetailsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
