import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('api works!');
});

export default router;
