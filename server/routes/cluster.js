const express = require('express');
const clusterController = require('../controllers/clusterController');

const router = express.Router();

router.get('/clusterdata', clusterController.getClusterInfo, (req, res) => {
  res.status(200).json(res.locals.clusterInfo);
});

module.exports = router;
