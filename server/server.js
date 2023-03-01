const express = require('express');
const cors = require('cors');
const clusterRouter = require('./routes/cluster');
const grafanaRouter = require('./routes/grafana');
const setupRouter = require('./routes/setup');
const setupController = require('./controllers/setupController');

const app = express();
const PORT = 3000;

// setupController.promInit(); // uncomment this to install prom
setupController.grafEmbed(); // ths port forwards

app.use(express.json());
app.use(cors());

app.use('setup', setupRouter);
app.use('/clusterdata', clusterRouter);
app.use('/grafana', grafanaRouter);

// catch all
app.use((req, res) => res.sendStatus(404));

// global err handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT} `));

module.exports = app;
