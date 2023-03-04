import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link, Navigate,
} from 'react-router-dom';
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
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import Banner from './Banner';
// import Testvis from '../../testvis';

import Overview from '../../Pages/Overview';
import Setup from '../../Pages/Setup';
import Nodes from '../../Pages/Grafana/Nodes';
import Cluster from '../../Pages/Grafana/Cluster';
import ClusterUseMethod from '../../Pages/Grafana/ClusterUseMethod';
import CoreDNS from '../../Pages/Grafana/CoreDNS';
import Kubelet from '../../Pages/Grafana/Kubelet';
import NodeUseMethod from '../../Pages/Grafana/NodeUseMethod';
import PromQuery from '../../Pages/PromQuery';
import Alerts from '../../Pages/Alerts';
import CustomAlerts from '../../Pages/CustomAlerts';

// Custom Theme for Material UI

function Navbar({ apiKey }) {
  const { collapseSidebar } = useProSidebar();
  const [teamSubMenuOpen, setTeamSubMenuOpen] = useState(false);
  const [title, setTitle] = useState('Overview');

  // const toggleTeamSubMenu = () => {
  //   setTeamSubMenuOpen(!teamSubMenuOpen);
  // };

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
            id="logo"
          >
            {' '}
            <h2>ClusterWatch</h2>
          </MenuItem>
          <MenuItem
            component={<Link to="Dashboard/Overview"> </Link>}
            icon={<HomeOutlinedIcon />}
            onClick={(e) => {
              setTitle(e.currentTarget.textContent);
            }}
          >
            Overview

          </MenuItem>
          {/* <MenuItem
            component={<Link to="/Metrics/Cluster"> Overview</Link>}
            icon={<PeopleOutlinedIcon />}
            onClick={(e) => setTitle(e.currentTarget.textContent)}
          >
            Team
          </MenuItem> */}
          <MenuItem
            component={<Link to="Dashboard/Setup" className="link" />}
            icon={<PeopleOutlinedIcon />}
            onClick={(e) => setTitle(e.currentTarget.textContent)}
          >
            Setup

          </MenuItem>
          <SubMenu
            opened={teamSubMenuOpen}
            icon={<AnalyticsOutlinedIcon />}
            label="Metrics"
          >
            <MenuItem
              component={<Link to="Dashboard/Metrics/Cluster" />}
              icon={<ScatterPlotOutlinedIcon />}
              onClick={(e) => setTitle(e.currentTarget.textContent)}
            >
              Kubernetes API Server
            </MenuItem>
            <MenuItem
              component={<Link to="Dashboard/Metrics/Nodes" />}
              icon={<AccountTreeOutlinedIcon />}
              onClick={(e) => setTitle(e.currentTarget.textContent)}
            >
              Nodes
            </MenuItem>
            <MenuItem
              component={<Link to="Dashboard/Metrics/Kubelet" />}
              icon={<ViewInArOutlinedIcon />}
              onClick={(e) => setTitle(e.currentTarget.textContent)}
            >
              Kubelet
            </MenuItem>
            <MenuItem
              component={<Link to="Dashboard/ClusterUseMethod" />}
              icon={<HubOutlinedIcon />}
              onClick={(e) => setTitle(e.currentTarget.textContent)}
            >
              Use Method(Cluster)
            </MenuItem>
            <MenuItem
              component={<Link to="Dashboard/Metrics/NodeUseMethod" />}
              icon={<PodcastsOutlinedIcon />}
              onClick={(e) => setTitle(e.currentTarget.textContent)}
            >
              Use Method(Node)
            </MenuItem>
            <MenuItem
              component={<Link to="Dashboard/Metrics/CoreDNS" />}
              icon={<FilterTiltShiftOutlinedIcon />}
              onClick={(e) => setTitle(e.currentTarget.textContent)}
            >
              CoreDNS
            </MenuItem>
          </SubMenu>

          <MenuItem
            component={<Link to="Dashboard/PromQuery" />}
            icon={<QueryStatsOutlinedIcon />}
            onClick={(e) => setTitle(e.currentTarget.textContent)}
          >
            Prom Query
          </MenuItem>
          <MenuItem
            component={<Link to="Dashboard/Alerts" />}
            icon={<AddAlertOutlinedIcon />}
            onClick={(e) => setTitle(e.currentTarget.textContent)}
          >
            Alert Manager
          </MenuItem>
          <MenuItem
            component={<Link to="Dashboard/CustomAlerts" />}
            icon={<NotificationAddOutlinedIcon />}
            onClick={(e) => setTitle(e.currentTarget.textContent)}
          >
            Custom Alerts
          </MenuItem>
          {/* <MenuItem icon={<NotificationAddOutlinedIcon />}>Calendar</MenuItem> */}
        </Menu>
      </Sidebar>
      <div className="page">
        <Banner title={title} />

        <Routes>
          <Route path="Dashboard/Overview" element={<Overview />} />
          <Route path="Dashboard/Setup" element={<Setup />} />
          <Route path="Dashboard/Alerts" element={<Alerts />} />
          <Route path="Dashboard/CustomAlerts" element={<CustomAlerts />} />
          <Route
            path="Dashboard/Metrics/Cluster"
            element={<Cluster apiKey={apiKey} />}
          />
          <Route
            path="Dashboard/Metrics/ClusterUseMethod"
            element={<ClusterUseMethod apiKey={apiKey} />}
          />
          <Route
            path="Dashboard/Metrics/CoreDNS"
            element={<CoreDNS apiKey={apiKey} />}
          />
          <Route
            path="Dashboard/Metrics/Kubelet"
            element={<Kubelet apiKey={apiKey} />}
          />
          <Route path="Dashboard/Metrics/Nodes" element={<Nodes apiKey={apiKey} />} />
          <Route
            path="Dashboard/Metrics/NodeUseMethod"
            element={<NodeUseMethod apiKey={apiKey} />}
          />
          <Route path="Dashboard/PromQuery" element={<PromQuery />} />
        </Routes>

      </div>
    </div>
  );
}

export default Navbar;
