import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';
import Banner from './Banner';
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
import Testvis from '../../testvis';

import Overview from '../../Pages/Overview';
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
            icon={<HomeOutlinedIcon />}
            onClick={(e) =>
              setTitle(e.currentTarget.querySelector('.link').textContent)
            }
          >
            <Link to="/Overview" className="link">
              Overview
            </Link>
          </MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            onClick={(e) =>
              setTitle(e.currentTarget.querySelector('.link').textContent)
            }
          >
            <Link to="/Metrics/Cluster" className="link">
              Team
            </Link>
          </MenuItem>

          <SubMenu
            opened={teamSubMenuOpen}
            icon={<AnalyticsOutlinedIcon />}
            label="Metrics"
          >
            <MenuItem
              icon={<ScatterPlotOutlinedIcon />}
              onClick={(e) =>
                setTitle(e.currentTarget.querySelector('.link').textContent)
              }
            >
              <Link to="/Metrics/Cluster" className="link">
                Kubernetes API Server
              </Link>
            </MenuItem>
            <MenuItem
              icon={<AccountTreeOutlinedIcon />}
              onClick={(e) =>
                setTitle(e.currentTarget.querySelector('.link').textContent)
              }
            >
              <Link to="/Metrics/Nodes" className="link">
                Nodes
              </Link>
            </MenuItem>
            <MenuItem
              icon={<ViewInArOutlinedIcon />}
              onClick={(e) =>
                setTitle(e.currentTarget.querySelector('.link').textContent)
              }
            >
              <Link to="/Metrics/Kubelet" className="link">
                Kubelet
              </Link>
            </MenuItem>
            <MenuItem
              icon={<HubOutlinedIcon />}
              onClick={(e) =>
                setTitle(e.currentTarget.querySelector('.link').textContent)
              }
            >
              <Link to="/Metrics/ClusterUseMethod" className="link">
                Use Method(Cluster)
              </Link>
            </MenuItem>
            <MenuItem
              icon={<PodcastsOutlinedIcon />}
              onClick={(e) =>
                setTitle(e.currentTarget.querySelector('.link').textContent)
              }
            >
              <Link to="/Metrics/NodeUseMethod" className="link">
                Use Method(Node)
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FilterTiltShiftOutlinedIcon />}
              onClick={(e) =>
                setTitle(e.currentTarget.querySelector('.link').textContent)
              }
            >
              <Link to="/Metrics/CoreDNS" className="link">
                CoreDNS
              </Link>
            </MenuItem>
          </SubMenu>

          <MenuItem
            icon={<QueryStatsOutlinedIcon />}
            onClick={(e) =>
              setTitle(e.currentTarget.querySelector('.link').textContent)
            }
          >
            <Link to="/PromQuery" className="link">
              Prom Query
            </Link>
          </MenuItem>
          <MenuItem
            icon={<AddAlertOutlinedIcon />}
            onClick={(e) =>
              setTitle(e.currentTarget.querySelector('.link').textContent)
            }
          >
            <Link to="/Alerts" className="link">
              Alert Manager
            </Link>
          </MenuItem>
          <MenuItem
            icon={<NotificationAddOutlinedIcon />}
            onClick={(e) =>
              setTitle(e.currentTarget.querySelector('.link').textContent)
            }
          >
            <Link to="/CustomAlerts" className="link">
              Custom Alerts
            </Link>
          </MenuItem>
          <MenuItem icon={<NotificationAddOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>

      <div className="page">
        <Banner title={title} />

        <Routes>
          <Route path="/Overview" element={<Overview />} />
          <Route path="/Alerts" element={<Alerts />} />
          <Route path="/CustomAlerts" element={<CustomAlerts />} />
          <Route
            path="/Metrics/Cluster"
            element={<Cluster apiKey={apiKey} />}
          />
          <Route
            path="/Metrics/ClusterUseMethod"
            element={<ClusterUseMethod apiKey={apiKey} />}
          />
          <Route
            path="/Metrics/CoreDNS"
            element={<CoreDNS apiKey={apiKey} />}
          />
          <Route
            path="/Metrics/Kubelet"
            element={<Kubelet apiKey={apiKey} />}
          />
          <Route path="/Metrics/Nodes" element={<Nodes apiKey={apiKey} />} />
          <Route
            path="/Metrics/NodeUseMethod"
            element={<NodeUseMethod apiKey={apiKey} />}
          />
          <Route path="/PromQuery" element={<PromQuery />} />
        </Routes>
      </div>
    </div>
  );
}

export default Navbar;
