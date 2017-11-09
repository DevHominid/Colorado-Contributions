import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import redis from 'redis';
import axios from 'axios';
import OpenSecretsCall from '../opensecrets-api';

// Dotenv config
dotenv.config();

// Create new redis client and connect to redis instance
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.log(`Error: ${err}`);
});

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

// Error logging middleware
app.use((err, req, res, next) => {
  console.log(`Error: \nMessage: ${err.message}`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
