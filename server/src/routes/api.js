import express from 'express';
import {
  findKeys,
  findOne,
  findMultiple,
  cacheKeys,
  cacheLegislators,
  cacheCandInfo,
  cacheCandIndustry
} from '../database';
import { getLegislators, getCandIndustry } from '../services';

const router = express.Router();

// fetch legislators keys from cache
// if keys found, fetch legislators from cache and send as res
// else, fetch legislators + keys from API, store in cache, and send as res
router.get('/legislators/:id', (req, res, next) => {
  const id = req.params.id;

  findKeys(id)
    .then((keys) => {
      if (keys) {
        findMultiple(JSON.parse(keys))
          .then((legislators) => {
            if (legislators) {
              res.json({ 'legislators': legislators, 'source': 'redis cache' });
            } else {
              console.log('resources not found');
            }
          })
          .catch((err) => {
            res.status(500).send(err.message);
            next(err);
          });
      } else {
        const query = { id: id };

        getLegislators(query)
          .then((result) => {
            return Promise.all([cacheLegislators(result[1]), cacheKeys(id, result[0])]);
          })
          .then((result) => {
            res.json({'legislators': result[0], 'source': 'OpenSecrets API'});
          })
          .catch((err) => {
            res.status(500).send(err.message);
            next(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
      next(err);
    });
});

router.get('/candidate/:cid/industries/:cycle', (req, res, next) => {
  const cid = req.params.cid;
  const cycle = req.params.cycle;
  const key = cid + cycle;

  findKeys(key)
    .then((keys) => {
      if (keys) {
        Promise.all([findOne(`candInfo:${cid}${cycle}`), findMultiple(JSON.parse(keys))])
          .then((result) => {
            res.json({ 'candInfo': result[0], 'candIndustry': result[1], 'source': 'redis cache'});
          })
          .catch((err) => {
            res.status(500).send(err.message);
            next(err);
          })
      } else {
        getCandIndustry(cid, cycle)
          .then((result) => {
            return Promise.all([cacheKeys(key, result[0]),
                                cacheCandInfo(result[1]),
                                cacheCandIndustry(key, result[2])]);
          })
          .then((result) => {
            res.json({ 'candInfo': result[1], 'candIndustry': result[2], 'source': 'OpenSecrets API'});
          })
          .catch((err) => {
            res.status(500).send(err.message);
            next(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
      next(err);
    });
});

export default router;
