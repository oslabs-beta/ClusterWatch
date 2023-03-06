import { Request, Response, NextFunction, RequestHandler } from 'express';


type Controller ={
  
  getApi?: RequestHandler;
  getUid?: RequestHandler;
}
const apiController:Controller = {};

apiController.getApi = async (req:Request, res:Response, next:NextFunction) => {
  console.log('received get request');
  try {
    let response  = await fetch('http://localhost:3001/api/auth/keys', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Authorization:
          'Basic ' + Buffer.from('admin:prom-operator').toString('base64'),
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
  } catch (error) {
    return next(error);
  }
};

apiController.getUid = async (req:Request, res:Response, next:NextFunction) => {
  console.log('received uid request');
  console.log(req.body);
  const { key, dashboard } :{key : string, dashboard: string}= req.body;

  try {
    let response = await fetch(
      `http://localhost:3001/api/search?query=${encodeURIComponent(dashboard)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Get the uid of the first dashboard in the list
        const uid:string = data[0].uid;
        res.locals.uid = uid;
      });
    return next();
  } catch (error) {
    return next(error);
  }
};

export default apiController;