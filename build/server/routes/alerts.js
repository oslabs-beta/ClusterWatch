const express = require('express');
const alertController = require('../controllers/alertController');
const router = express.Router();
router.post('/', alertController.createAlert, (req, res) => {
    res.sendStatus(200);
});
module.exports = router;
