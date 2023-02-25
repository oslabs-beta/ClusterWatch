const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/clusterdata', )

// catch all
app.use((req, res) => res.sendStatus(404));

// global err handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT} `));

module.exports = app;
