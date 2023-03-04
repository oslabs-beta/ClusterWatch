"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cluster_1 = __importDefault(require("./routes/cluster"));
const grafana_1 = __importDefault(require("./routes/grafana"));
const setup_1 = __importDefault(require("./routes/setup"));
const alerts_1 = __importDefault(require("./routes/alerts"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/setup', setup_1.default);
app.use('/clusterdata', cluster_1.default);
app.use('/grafana', grafana_1.default);
app.use('/alerts', alerts_1.default);
// catch all
app.use((req, res) => res.sendStatus(404));
// global err handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({ defaultErr }, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT.toString(), () => console.log(`Server listening on port ${PORT}`));
exports.default = app;
