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
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import ScatterPlotOutlinedIcon from '@mui/icons-material/ScatterPlotOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import FilterTiltShiftOutlinedIcon from '@mui/icons-material/FilterTiltShiftOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import Testvis from '../visualizer/Visualizer';

import Overview from '../../Pages/Overview';
import Nodes from '../../Pages/Grafana/Nodes';
import Cluster from '../../Pages/Grafana/Cluster';
import ClusterUseMethod from '../../Pages/Grafana/ClusterUseMethod';
import CoreDNS from '../../Pages/Grafana/CoreDNS';
import Kubelet from '../../Pages/Grafana/Kubelet';
import NodeUseMethod from '../../Pages/Grafana/NodeUseMethod';

// Custom Theme for Material UI

function Navbar({ apiKey }) {
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
            icon={<AnalyticsOutlinedIcon />}
            label="Metrics"
          >
            <MenuItem icon={<ScatterPlotOutlinedIcon />}>
              <Link to="/Metrics/Cluster" className="link">
                Cluster
              </Link>
            </MenuItem>
            <MenuItem icon={<AccountTreeOutlinedIcon />}>
              <Link to="/Metrics/Nodes" className="link">
                Nodes
              </Link>
            </MenuItem>
            <MenuItem icon={<ViewInArOutlinedIcon />}>
              <Link to="/Metrics/Kubelet" className="link">
                Kubelet
              </Link>
            </MenuItem>
            <MenuItem icon={<HubOutlinedIcon />}>
              <Link to="/Metrics/ClusterUseMethod" className="link">
                Use Method(Cluster)
              </Link>
            </MenuItem>
            <MenuItem icon={<PodcastsOutlinedIcon />}>
              <Link to="/Metrics/NodeUseMethod" className="link">
                Use Method(Node)
              </Link>
            </MenuItem>
            <MenuItem icon={<FilterTiltShiftOutlinedIcon />}>
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
        <Route path="/Metrics/Cluster" element={<Cluster apiKey={apiKey} />} />
        <Route
          path="/Metrics/ClusterUseMethod"
          element={<ClusterUseMethod apiKey={apiKey} />}
        />
        <Route path="/Metrics/CoreDNS" element={<CoreDNS apiKey={apiKey} />} />
        <Route path="/Metrics/Kubelet" element={<Kubelet apiKey={apiKey} />} />
        <Route path="/Metrics/Nodes" element={<Nodes apiKey={apiKey} />} />
        <Route
          path="/Metrics/NodeUseMethod"
          element={<NodeUseMethod apiKey={apiKey} />}
        />
      </Routes>
    </div>
  );
}

export default Navbar;
