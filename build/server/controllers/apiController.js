"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiController = {};
apiController.getApi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('received get request');
    try {
        let response = yield fetch('http://localhost:3001/api/auth/keys', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Authorization: 'Basic ' + Buffer.from('admin:prom-operator').toString('base64'),
                Accept: '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: Math.random().toString(36).substring(7),
                role: 'Admin',
                secondsToLive: 86400,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
            res.locals.key = data.key;
            console.log('returned key:', data.key);
        });
        return next();
    }
    catch (error) {
        return next(error);
    }
});
apiController.getUid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('received uid request');
    console.log(req.body);
    const { key, dashboard } = req.body;
    try {
        let response = yield fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(dashboard)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${key}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
            // Get the uid of the first dashboard in the list
            const uid = data[0].uid;
            res.locals.uid = uid;
        });
        return next();
    }
    catch (error) {
        return next(error);
    }
});
exports.default = apiController;
