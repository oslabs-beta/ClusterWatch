"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Visualizer_1 = __importDefault(require("../components/visualizer/Visualizer"));
function Overview() {
    return (react_1.default.createElement("div", { id: "visualizer", "data-testid": "visualizer" },
        react_1.default.createElement(Visualizer_1.default, { "data-testid": 'test-vis' })));
}
exports.default = Overview;
