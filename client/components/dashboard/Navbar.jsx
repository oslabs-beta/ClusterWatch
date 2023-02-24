import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import {
  Sidebar, Menu, MenuItem, SubMenu, useProSidebar,
} from 'react-pro-sidebar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Testvis from '../../testvis';

import Overview from '../menus/Overview';

// Custom Theme for Material UI

function Navbar() {
  const { collapseSidebar } = useProSidebar();
  const [teamSubMenuOpen, setTeamSubMenuOpen] = useState(false);

  const toggleTeamSubMenu = () => {
    setTeamSubMenuOpen(!teamSubMenuOpen);
  };
  return (

    <div id="app" style={{ height: '100vh', display: 'flex' }}>
      {/* <Testvis /> */}
      <Sidebar style={{ height: '100vh' }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: 'center' }}
          >
            {' '}
            <h2>DIZ KUBERNUTS</h2>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />}><Link to="/Overview">Overview</Link></MenuItem>
          <MenuItem onClick={toggleTeamSubMenu} icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <SubMenu opened={teamSubMenuOpen}>

            <MenuItem>Person 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>DIZ  KUBERNUTZ</MenuItem>

          </SubMenu>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>

      </Sidebar>

      <div className="column2">
        <Routes>
          <Route path="/Overview" element={<Overview />} />
        </Routes>
      </div>

    </div>

  );
}

export default Navbar;
