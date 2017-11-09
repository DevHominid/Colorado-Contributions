import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import axios from 'axios';
import OpenSecretsCall from '../opensecrets-api';
import { apiRouter } from './routes';

// Dotenv config
dotenv.config();

// Init app
const app = express();
const port = process.env.PORT || 8080;

// app.get('/', (req, res, next) => {
//   const getLegislators = new OpenSecretsCall('getLegislators', { id: 'NJ' });
//   getLegislators.fetchData()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// Init routing middleware
app.use('/api', apiRouter);

// Init error logging middleware
app.use((err, req, res, next) => {
  console.log(`Error: \nMessage: ${err.message}`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
