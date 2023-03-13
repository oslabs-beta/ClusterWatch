"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = __importDefault(require("./components/dashboard/Dashboard"));
const SetupButtons_1 = __importDefault(require("./components/SetupButtons"));
// Custom Theme for Material UI
function App() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/Dashboard/*", element: react_1.default.createElement(Dashboard_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(SetupButtons_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/Dashboard", element: react_1.default.createElement(react_router_dom_1.Navigate, { to: "Dashboard/Overview" }) }) // removed exact from path
        ,
            " // removed exact from path")));
}
exports.default = App;
