import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import OpenSecretsCall from '../opensecrets-api';


// Dotenv config
dotenv.config();

// Init app
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('hello world');
});

// Error logging middleware
app.use((err, req, res, next) => {
  console.log(`Error: \nMessage: ${err.message}`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
