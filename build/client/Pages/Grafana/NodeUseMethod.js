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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function NodeUseMethod({ apiKey }) {
    const [uid, setUid] = (0, react_1.useState)(null);
    const now = new Date().getTime();
    const from = new Date(now - 4 * 60 * 60 * 1000).getTime();
    (0, react_1.useEffect)(() => {
        fetch('http://localhost:3000/grafana/uid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: apiKey,
                dashboard: 'Node Exporter / USE Method / Node',
            }),
        })
            .then((res) => res.json())
            .then((data) => {
            setUid(data);
        });
    }, [apiKey]);
    const url = `http://localhost:3001/d/${uid}/node-exporter-use-method-node?orgId=1&refresh=30s&from=${from}&to=${now}&kiosk=true&theme=light`;
    return (react_1.default.createElement("div", { className: "iframe" },
        react_1.default.createElement("iframe", { src: url, width: "100%", height: "100%" })));
}
exports.default = NodeUseMethod;
