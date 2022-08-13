// import "dotenv/config";
import './../config/config'
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
import cors from 'cors';
import compression from 'compression'
import passport from 'passport';
import xss from 'xss-clean';
import routesV1 from '../routes/v1/routes';
import {notFound ,errorHandler} from '../common/middlewares/error.middleware';
import  authLimiter from './../common/middlewares/rateLimiter.middleware';
import  { jwtStrategy } from '../auth/config/passport';


const server = express();

//set app port and host 
const APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';
server.set('port', APP_PORT);
server.set('host', APP_HOST);
server.locals.title = process.env.APP_NAME;
server.locals.version = process.env.APP_VERSION;
server.locals.apiVersion = process.env.API_VERSION;
server.use(morgan('dev'));

// set security HTTP headers
server.use(helmet());

// parse json request body
server.use(express.json());

// parse urlencoded request body
server.use(express.urlencoded({ extended: true }));

// sanitize request data
server.use(xss());

// gzip compression
server.use(compression());

// enable cors
server.use(cors());
server.options('*', cors());

// jwt authentication
server.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (process.env.NODE_ENV === 'production') {
  server.use('/v1/auth', authLimiter);
}

// v1 api routes
server.use('/api/v1', routesV1);

server.use(notFound);
server.use(errorHandler);

export default server;
