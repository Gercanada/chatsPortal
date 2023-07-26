import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuIcon } from './MenuIcon';
import { useTranslation } from 'react-i18next';

export const SidebarItemDropdown = ({ title = 'default', icon, elements = [], navigateTo }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon className='paddinAbajito'>
          <MenuIcon context={`bx ${icon}`} />
          {/* <i className={`bx ${icon}`} /> */}
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <i className='bx bx-chevron-up'></i> : <i className='bx bx-chevron-down'></i>}
      </ListItemButton>

      <Collapse in={open} timeout='auto' unmountOnExit>
        {elements.map((element, key) => (
          <List component='div' disablePadding key={`${key}-${element?.url}`}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigateTo(element?.url)}>
              <ListItemIcon>
                <i className={`bx ${element.icon}`} />
              </ListItemIcon>
              <ListItemText primary={t(element?.title_locale)} />
            </ListItemButton>
          </List>
        ))}
      </Collapse>
    </>
  );
};

SidebarItemDropdown.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  navigateTo: PropTypes.func.isRequired,
};
