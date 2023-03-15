import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import clusterRouter from './routes/cluster';
import grafanaRouter from './routes/grafana';
import setupRouter from './routes/setup';
import alertsRouter from './routes/alerts';
import * as path from 'path';

//Define the error object type to use
type ServerError= {
  log: string;
  status: number;
  message: { err: string };
}



const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(cors());
// console.log('type: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  // console.log('i am inside the production mode fetching files...')
  // statically serve everything in the build folder on the route '/build'
  app.use('/', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  // app.get('/', (req, res) => {
  //   return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
  // });
}

app.use('/setup', setupRouter);
app.use('/clusterdata', clusterRouter);
app.use('/grafana', grafanaRouter);

app.use('/alerts', alertsRouter);

// catch all
app.use((req: Request, res: Response):Response => res.sendStatus(404));

// global err handler
app.use((err: ServerError, req: Request, res: Response, next: NextFunction):Response => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT.toString(), () =>
  console.log(`Server listening on port ${PORT}`)
);

export default app;