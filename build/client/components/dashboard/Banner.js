"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Banner({ title }) {
    return (react_1.default.createElement("div", { id: "Banner" },
        react_1.default.createElement("h2", null, title)));
}
exports.default = Banner;
