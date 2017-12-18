import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import 'babel-polyfill';
import axios from 'axios';
import OpenSecretsCall from '../opensecrets-api';
import { apiRouter } from './routes';

// Dotenv config
dotenv.config();

// Init app
const app = express();
const port = process.env.PORT || 8080;

// Use gzip compression & helmet
app.use(compression());
app.use(helmet());

// Enable CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

// Init routing middleware
app.use('/api', apiRouter);

// Init error logging middleware
app.use((err, req, res, next) => {
  console.error(`Error: \nMessage: ${err.message}`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
