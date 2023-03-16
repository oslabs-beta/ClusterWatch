"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Setup() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Fancy Buttons"),
        react_1.default.createElement("button", { onClick: () => fetch('http://localhost:3000/setup/promSetup'), type: "button" }, "Setup Prometheus"),
        react_1.default.createElement("button", { onClick: () => fetch('http://localhost:3000/setup/grafSetup'), type: "button" }, "Setup Grafana"),
        react_1.default.createElement("button", { onClick: () => fetch('http://localhost:3000/setup/forwardPorts'), type: "button" }, "Start Port Forwarding"),
        react_1.default.createElement("button", { type: "button" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/Dashboard" }, "Go to dashboard"))));
}
exports.default = Setup;
