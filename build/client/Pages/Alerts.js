"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Alerts() {
    return (react_1.default.createElement("div", { className: 'iframe' },
        react_1.default.createElement("iframe", { src: "http://localhost:9093", width: "100%", height: "100%", title: 'alert embed' })));
}
exports.default = Alerts;
