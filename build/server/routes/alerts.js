"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alertController_1 = __importDefault(require("../controllers/alertController"));
const router = express_1.default.Router();
router.post('/', alertController_1.default.createAlert, (req, res) => {
    res.sendStatus(200);
});
exports.default = router;
