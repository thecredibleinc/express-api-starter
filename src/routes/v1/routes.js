import { Router } from 'express';
import emojis from './../../api/emojis';

const routesV1 = Router();
routesV1.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});
routesV1.use('/emojis', emojis);

export default routesV1;
