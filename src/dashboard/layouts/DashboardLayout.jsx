import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { SearchBar } from '../../components/search/SearchBar';
import { Navbar, Sidebar } from '../components';
import { Footer } from '../components/Footer';
import SideBarFixed from '../components/menus/sidebar/SideBarFixed';
import { useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';

export const DashboardLayout = ({ children }) => {
  const { loading} = useSelector(
    (state) => state.whatsApp,
  );
  return (
    <>
    {loading && <Loader/>}
      <SideBarFixed children={children}/>
    </>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
