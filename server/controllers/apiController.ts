import { Request, Response, NextFunction, RequestHandler } from 'express';
const redis = require('../redis/redis');

type Controller = {
  getApi?: RequestHandler;
  getUid?: RequestHandler;
};
const apiController: Controller = {};

apiController.getApi = async (req, res, next) => {
  const cacheKey = 'api_key';
  try {
    // Try to get the API key from the cache
    const cachedValue = await redis.get(cacheKey);
    if (cachedValue !== null) {
      // Return the cached API key if it exists
      res.locals.key = cachedValue;
      console.log('cached retrieved', cachedValue);
      return next();
    }
    // If the API key is not in the cache, fetch it from the API
    let response = await fetch('http://localhost:3001/api/auth/keys', {
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
    });
    let data = await response.json();
    res.locals.key = data.key;
    // Cache the API key for 1 hour
    await redis.set(cacheKey, data.key, 'EX', 3600);
    return next();
  } catch (error) {
    return next(error);
  }
};

apiController.getUid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('received uid request');
  console.log(req.body);
  const { key, dashboard }: { key: string; dashboard: string } = req.body;

  try {
    const cachedValue = await redis.get(dashboard);
    if (cachedValue !== null) {
      res.locals.uid = cachedValue;
      console.log('uid retrieved', cachedValue);
      return next();
    }
    let response = await fetch(
      `http://localhost:3001/api/search?query=${encodeURIComponent(dashboard)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      }
    );
    let data: any = await response.json();

    // Get the uid of the first dashboard in the list
    const uid: any = data[0].uid;
    res.locals.uid = uid;
    console.log('uid not in redis, setting uid', uid);
    await redis.set(dashboard, uid, 'EX', 3600);

    return next();
  } catch (error) {
    console.log('error fetching uid', error);
    return next(error);
  }
};

export default apiController;
