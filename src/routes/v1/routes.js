import { Router } from 'express';
import emojis from './../../api/emojis';
import tempROutes from './../../api/temp/routes/routes'
const routesV1 = Router();
routesV1.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});
routesV1.use('/emojis', emojis);
routesV1.use('/temp', tempROutes);

export default routesV1;
