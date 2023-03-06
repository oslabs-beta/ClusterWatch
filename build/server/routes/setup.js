const express = require('express');
const setupController = require('../controllers/setupController');
const router = express.Router();
router.get('/promSetup', setupController.promInit, (req, res) => {
    res.sendStatus(200);
});
router.get('/grafSetup', setupController.grafEmbed, (req, res) => {
    res.sendStatus(200);
});
router.get('/forwardPort', setupController.forwardPort, (req, res) => {
    res.sendStatus(200);
});
module.exports = router;
