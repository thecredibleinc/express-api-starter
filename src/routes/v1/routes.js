import { Router } from 'express';
import emojis from './../../api/emojis';
import tempROutes from './../../api/temp/routes/routes'
import userRoutes from './../../api/auth/routes/user.routes'
import authRoutes from './../../api/auth/routes/auth.routes'
import FileRoutes from "../../api/files/routes/files.routes"
const routesV1 = Router();
routesV1.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});
routesV1.use('/emojis', emojis);
routesV1.use('/auth', authRoutes);
routesV1.use('/temp', tempROutes);
routesV1.use('/users', userRoutes);

new FileRoutes().setUpRoutes(routesV1)

export default routesV1;
