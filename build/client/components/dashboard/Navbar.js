"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_pro_sidebar_1 = require("react-pro-sidebar");
const HomeOutlined_1 = __importDefault(require("@mui/icons-material/HomeOutlined"));
const AnalyticsOutlined_1 = __importDefault(require("@mui/icons-material/AnalyticsOutlined"));
const ScatterPlotOutlined_1 = __importDefault(require("@mui/icons-material/ScatterPlotOutlined"));
const AccountTreeOutlined_1 = __importDefault(require("@mui/icons-material/AccountTreeOutlined"));
const PeopleOutlined_1 = __importDefault(require("@mui/icons-material/PeopleOutlined"));
const MenuOutlined_1 = __importDefault(require("@mui/icons-material/MenuOutlined"));
const ViewInArOutlined_1 = __importDefault(require("@mui/icons-material/ViewInArOutlined"));
const FilterTiltShiftOutlined_1 = __importDefault(require("@mui/icons-material/FilterTiltShiftOutlined"));
const HubOutlined_1 = __importDefault(require("@mui/icons-material/HubOutlined"));
const PodcastsOutlined_1 = __importDefault(require("@mui/icons-material/PodcastsOutlined"));
const QueryStatsOutlined_1 = __importDefault(require("@mui/icons-material/QueryStatsOutlined"));
const AddAlertOutlined_1 = __importDefault(require("@mui/icons-material/AddAlertOutlined"));
const NotificationAddOutlined_1 = __importDefault(require("@mui/icons-material/NotificationAddOutlined"));
const Banner_1 = __importDefault(require("./Banner"));
// import Testvis from '../../testvis';
const Overview_1 = __importDefault(require("../../Pages/Overview"));
const Setup_1 = __importDefault(require("../../Pages/Setup"));
const Nodes_1 = __importDefault(require("../../Pages/Grafana/Nodes"));
const Cluster_1 = __importDefault(require("../../Pages/Grafana/Cluster"));
const ClusterUseMethod_1 = __importDefault(require("../../Pages/Grafana/ClusterUseMethod"));
const CoreDNS_1 = __importDefault(require("../../Pages/Grafana/CoreDNS"));
const Kubelet_1 = __importDefault(require("../../Pages/Grafana/Kubelet"));
const NodeUseMethod_1 = __importDefault(require("../../Pages/Grafana/NodeUseMethod"));
const PromQuery_1 = __importDefault(require("../../Pages/PromQuery"));
const Alerts_1 = __importDefault(require("../../Pages/Alerts"));
const CustomAlerts_1 = __importDefault(require("../../Pages/CustomAlerts"));
function Navbar({ apiKey }) {
    const { collapseSidebar } = (0, react_pro_sidebar_1.useProSidebar)();
    const [teamSubMenuOpen, setTeamSubMenuOpen] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)('Overview');
    // const toggleTeamSubMenu = () => {
    //   setTeamSubMenuOpen(!teamSubMenuOpen);
    // };
    return (react_1.default.createElement("div", { id: "app", style: { height: '100vh', display: 'flex' } },
        react_1.default.createElement(react_pro_sidebar_1.Sidebar, { style: { height: '100vh' } },
            react_1.default.createElement(react_pro_sidebar_1.Menu, null,
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(MenuOutlined_1.default, null), onClick: () => {
                        collapseSidebar();
                    }, style: { textAlign: 'center' }, id: "logo", "data-testid": "pro-sidebar" },
                    ' ',
                    react_1.default.createElement("h2", null, "ClusterWatch")),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Overview" }, " "), icon: react_1.default.createElement(HomeOutlined_1.default, null), onClick: (e) => {
                        setTitle(e.currentTarget.textContent);
                    } }, "Overview"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Setup", className: "link" }), icon: react_1.default.createElement(PeopleOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Setup"),
                react_1.default.createElement(react_pro_sidebar_1.SubMenu, { icon: react_1.default.createElement(AnalyticsOutlined_1.default, null), label: "Metrics" },
                    react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Metrics/Cluster" }), icon: react_1.default.createElement(ScatterPlotOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Kubernetes API Server"),
                    react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Metrics/Nodes" }), icon: react_1.default.createElement(AccountTreeOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Nodes"),
                    react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Metrics/Kubelet" }), icon: react_1.default.createElement(ViewInArOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Kubelet"),
                    react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/ClusterUseMethod" }), icon: react_1.default.createElement(HubOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Use Method(Cluster)"),
                    react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Metrics/NodeUseMethod" }), icon: react_1.default.createElement(PodcastsOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Use Method(Node)"),
                    react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Metrics/CoreDNS" }), icon: react_1.default.createElement(FilterTiltShiftOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "CoreDNS")),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/PromQuery" }), icon: react_1.default.createElement(QueryStatsOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Prom Query"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/Alerts" }), icon: react_1.default.createElement(AddAlertOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Alert Manager"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { component: react_1.default.createElement(react_router_dom_1.Link, { to: "Dashboard/CustomAlerts" }), icon: react_1.default.createElement(NotificationAddOutlined_1.default, null), onClick: (e) => setTitle(e.currentTarget.textContent) }, "Custom Alerts"))),
        react_1.default.createElement("div", { className: "page" },
            react_1.default.createElement(Banner_1.default, { title: title }),
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Overview", element: react_1.default.createElement(Overview_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Setup", element: react_1.default.createElement(Setup_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Alerts", element: react_1.default.createElement(Alerts_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/CustomAlerts", element: react_1.default.createElement(CustomAlerts_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Metrics/Cluster", element: react_1.default.createElement(Cluster_1.default, { apiKey: apiKey }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Metrics/ClusterUseMethod", element: react_1.default.createElement(ClusterUseMethod_1.default, { apiKey: apiKey }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Metrics/CoreDNS", element: react_1.default.createElement(CoreDNS_1.default, { apiKey: apiKey }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Metrics/Kubelet", element: react_1.default.createElement(Kubelet_1.default, { apiKey: apiKey }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Metrics/Nodes", element: react_1.default.createElement(Nodes_1.default, { apiKey: apiKey }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/Metrics/NodeUseMethod", element: react_1.default.createElement(NodeUseMethod_1.default, { apiKey: apiKey }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "Dashboard/PromQuery", element: react_1.default.createElement(PromQuery_1.default, null) })))));
}
exports.default = Navbar;
