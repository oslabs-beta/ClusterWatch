const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/key', apiController.getApi, (req, res) => {
  res.status(200).json(res.locals.key);
});
router.post('/uid', apiController.getUid, (req, res) => {
  res.status(200).json(res.locals.uid);
});

module.exports = router;
