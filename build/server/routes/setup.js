"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setupController_1 = __importDefault(require("../controllers/setupController"));
const router = express_1.default.Router();
router.get('/promSetup', setupController_1.default.promInit, (req, res) => {
    res.sendStatus(200);
});
router.get('/grafSetup', setupController_1.default.grafEmbed, (req, res) => {
    res.sendStatus(200);
});
router.get('/forwardPorts', setupController_1.default.forwardPorts, (req, res) => {
    res.sendStatus(200);
});
exports.default = router;
