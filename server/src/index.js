import express from 'express';
import dotenv from 'dotenv';

// Dotenv config
dotenv.config();

// Init app
const app = express();
const port = process.env.PORT || 8080;

// Error logging middleware
app.use((err, req, res, next) => {
  console.log(`Error: \nMessage: ${err.message}`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
