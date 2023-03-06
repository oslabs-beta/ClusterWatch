"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SetupButtons_1 = __importDefault(require("../components/SetupButtons"));
function Overview() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("iframe", { src: "https://giphy.com/embed/dWa2rUaiahx1FB3jor", width: "480", height: "480", frameBorder: "0", class: "giphy-embed", allowFullScreen: true }),
        react_1.default.createElement(SetupButtons_1.default, null)));
}
exports.default = Overview;
