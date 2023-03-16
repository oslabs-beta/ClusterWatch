"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clusterController_1 = __importDefault(require("../controllers/clusterController"));
const router = express_1.default.Router();
router.get('/', clusterController_1.default.getClusterInfo, (req, res) => {
    res.status(200).json(res.locals.clusterInfo);
});
exports.default = router;
