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
import {notFound ,genericErrorHandler} from '../api/common/middlewares/error.middleware';
import  authLimiter from './../api/common/middlewares/rateLimiter.middleware';
import  { jwtStrategy } from '../api/auth/config/passport';
import db from './../utils/dbconnection.util'
import logger from '../utils/logger.util'
import { setLocale } from '../utils/localization/localization.util';
import formData from "express-form-data"
import os from "os"
import path from "path"
import { CronManager } from '../jobs/cronManager';
import ExampleJob from '../jobs/example.jobs';
const server = express();

setLocale("en-us");
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

//file upload
server.use(formData.parse({
  uploadDir: os.tmpdir(),
  autoClean: true
}));
// server.use(fileUpload(
//   {
//   limits: { fileSize: 50 * 1024 * 1024 },
//   useTempFiles : true,
//   tempFileDir : '/tmp/'
// }
// ));
//serve static files as well as uploaded files
server.use("/assets", express.static(path.join(process.cwd(), 'resources', 'static', 'uploads')));


// parse urlencoded request body
server.use(express.urlencoded({ extended: true }));

// sanitize request data
server.use(xss());

// gzip compression
server.use(compression());

// enable cors
server.use(cors());
server.options('*', cors());

//initialise db 
async function initialiseDb(){
  try{
    await db.sync();
    await logger.info( "Connected to the Database successfully");
  }catch(err){
    await logger.error( `DB CONNECTIVITY ERROR: Message: ${e}.`);
    await logger.error(`Terminating the process with code:1, due to DB CONNECTIVITY ERROR.`);
    process.exit(1);
  }
}
Promise.all([initialiseDb()])

//enable cron jobs ...!!
function initializeJobs() {
  const cronManager = CronManager.getInstance()
  cronManager.addJob(new ExampleJob())
  // new ExampleJob().executeJob()
  cronManager.startAll();
}
initializeJobs();

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
server.use(genericErrorHandler);

export default server;
