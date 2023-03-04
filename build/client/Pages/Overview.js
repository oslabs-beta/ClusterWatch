"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Visualizer_1 = __importDefault(require("../components/visualizer/Visualizer"));
const Banner_1 = __importDefault(require("../components/dashboard/Banner"));
function Overview() {
    return (react_1.default.createElement("div", { id: "visualizer" },
        react_1.default.createElement(Visualizer_1.default, null))
    // <div className='iframe'>
    //  <iframe
    //   src="http://localhost:3001/d/YEPQHRbVz/node-exporter-nodes?kiosk&orgId=1&refresh=30s&from=1677163156470&to=1677166756470"
    //   width="100%"
    //   height="100%"
    // ></iframe>
    // </div>
    );
}
exports.default = Overview;
