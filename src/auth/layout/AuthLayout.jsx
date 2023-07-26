import { Box } from '@mui/system';
import PropTypes from 'prop-types';

export const AuthLayout = ({ children }) => {
  return (
    <>
      <main>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          height='calc(100vh - 200px)'
        >
          {children}
        </Box>
      </main>
    </>
  );
};
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}