import fs from 'fs';
import path from 'path';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import MongoStore from 'connect-mongo';
import{ MongoClient, ServerApiVersion } from 'mongodb';
import env from './environments';
import mountPaymentsEndpoints from './handlers/payments';
import mountUserEndpoints from './handlers/users';


// We must import typedefs for ts-node-dev to pick them up when they change (even though tsc would supposedly
// have no problem here)
// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata#comment125163548_65381085
import "./types/session";
import mountServiceEndpoints from './handlers/files';




const dbName = env.mongo_db_name;
// const mongoUri = `mongodb://${env.mongo_host}/${dbName}`;
const mongoUri =env.mongo_host
const mongoClientOptions = {
  authSource: "admin",
  auth: {
    username: env.mongo_user,
    password: env.mongo_password,
  },
}


//
// I. Initialize and set up the express app and various middlewares and packages:
//

const app: express.Application = express();

// Log requests to the console in a compact format:
app.use(logger('dev'));

// Full log of all requests to /log/access.log:
app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, '..', 'log', 'access.log'), { flags: 'a' }),
}));

// Enable response bodies to be sent as JSON:
app.use(express.json())

app.use(express.urlencoded({extended: true})); 
app.use(express.json())

const expressfileupload= require('express-fileupload')
app.use(expressfileupload())

// Handle CORS:
app.use(cors({
  origin: env.frontend_url,
  credentials: true
}));

// Handle cookies 🍪
app.use(cookieParser());


import cloudinary from 'cloudinary';


// Configuration 
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});



// Use sessions:
app.use(session({
  secret: env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoUri,
    mongoOptions: mongoClientOptions,
    dbName: dbName,
    collectionName: 'user_sessions'
  }),
}));


//
// II. Mount app endpoints:
//

// Payments endpoint under /payments:
const paymentsRouter = express.Router();
mountPaymentsEndpoints(paymentsRouter);
app.use('/payments', paymentsRouter);

// User endpoints (e.g signin, signout) under /user:
const userRouter = express.Router();
mountUserEndpoints(userRouter);
app.use('/user', userRouter);

const serviceRouter = express.Router();
mountServiceEndpoints(serviceRouter);
app.use('/users',serviceRouter);


// Hello World page to check everything works:
app.get('/', async (_, res) => {
  res.status(200).send({ message: "Hello, World!" });
});


// III. Boot up the app:



app.listen(8000, async () => {
  try {
    var MongoClient = require('mongodb').MongoClient;

    var uri = env.mongo_host
    MongoClient.connect(uri, function(err:any , client:any) {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      // client.close();
      
      const db = client.db(dbName);
      app.locals.orderCollection = db.collection('orders');
      app.locals.userCollection = db.collection('users');
      app.locals.store =db.collection('store');
      app.locals.sharedCollection=db.collection('shared_resources');
      console.log("Running server and db ")
    });
    //('Connected to MongoDB on: ', mongoUri)
  } catch (err) {
    console.error('Connection to MongoDB failed: ', err)
  }

  //('App platform demo app - Backend listening on port 8000!');
  //(`CORS config: configured to respond to a frontend hosted on ${env.frontend_url}`);
});
