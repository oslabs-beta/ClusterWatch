"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = __importDefault(require("../controllers/apiController"));
const router = express_1.default.Router();
router.get('/key', apiController_1.default.getApi, (req, res) => {
    res.status(200).json(res.locals.key);
});
router.post('/uid', apiController_1.default.getUid, (req, res) => {
    res.status(200).json(res.locals.uid);
});
exports.default = router;
