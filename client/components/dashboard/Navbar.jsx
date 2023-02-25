import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Testvis from '../../testvis';

import Overview from '../../Pages/Overview';
import Nodes from '../../Pages/Grafana/Nodes';
import Cluster from '../../Pages/Grafana/Cluster';
import ClusterUseMethod from '../../Pages/Grafana/ClusterUseMethod';
import CoreDNS from '../../Pages/Grafana/CoreDNS';
import Kubelet from '../../Pages/Grafana/Kubelet';
import NodeUseMethod from '../../Pages/Grafana/NodeUseMethod';

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
          <MenuItem icon={<HomeOutlinedIcon />}>
            <Link to="/Overview" className="link">
              Overview
            </Link>
          </MenuItem>
          <MenuItem
            onClick={toggleTeamSubMenu}
            icon={<PeopleOutlinedIcon />}
            Home
          >
            Team
          </MenuItem>

          <SubMenu
            opened={teamSubMenuOpen}
            icon={<PeopleOutlinedIcon />}
            label="Metrics"
          >
            <MenuItem>
              <Link to="/Metrics/Cluster" className="link">
                Cluster
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Metrics/Nodes" className="link">
                Nodes
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Metrics/Kubelet" className="link">
                Kubelet
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Metrics/ClusterUseMethod" className="link">
                Use Method(Cluster)
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Metrics/NodeUseMethod" className="link">
                Use Method(Node)
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Metrics/CoreDNS" className="link">
                CoreDNS
              </Link>
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>

      <Routes>
        <Route path="/Overview" element={<Overview />} />
        <Route path="/Metrics/Cluster" element={<Cluster />} />
        <Route
          path="/Metrics/ClusterUseMethod"
          element={<ClusterUseMethod />}
        />
        <Route path="/Metrics/CoreDNS" element={<CoreDNS />} />
        <Route path="/Metrics/Kubelet" element={<Kubelet />} />
        <Route path="/Metrics/Nodes" element={<Nodes />} />
        <Route path="/Metrics/NodeUseMethod" element={<NodeUseMethod />} />
      </Routes>
    </div>
  );
}

export default Navbar;
