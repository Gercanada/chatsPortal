import { Breadcrumbs, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { SearchBar } from '../../components/search/SearchBar';
import { Navbar, Sidebar } from '../components';
import { Footer } from '../components/Footer';
import SideBarFixed from '../components/menus/sidebar/SideBarFixed';

export const DashboardLayout = ({ children }) => {
  return (
    <>
      <SideBarFixed children={children}/>
      {/* <main
        style={{
          
          paddingTop: '50px',
          maxWidth: '100%',
          marginLeft: '0.5%',
          marginRight: '0.5%',
          
          minHeight: '100vh'
        }}
        sx={{display: 'flex', justifyContent: 'center'}}
      >
        {children}
      </main> */}
      <Footer  />
    </>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
