import express from 'express';
import { findLegislators, findLegislatorKeys, cacheKeys, cacheLegislators } from '../database';
import { getLegislators, getCandIndustry } from '../services';

const router = express.Router();

// fetch legislators keys from cache
// if keys found, fetch legislators from cache and send as res
// else, fetch legislators + keys from API, store in cache, and send as res
router.get('/legislators/:id', (req, res, next) => {
  const id = req.params.id;

  findLegislatorKeys(id)
    .then((keys) => {
      if (keys) {
        findLegislators(JSON.parse(keys))
          .then((legislators) => {
            if (legislators) {
              res.send({ 'legislators': legislators, 'source': 'redis cache' });
            } else {
              console.log('resources not found');
            }
          })
      } else {
        const query = { id: id };

        getLegislators(query)
          .then((result) => {
            return Promise.all([cacheLegislators(result[1]), cacheLegislatorKeys(id, result[0])]);
          })
          .then((result) => {
            res.send({'legislators': result[0], 'source': 'OpenSecrets API'});
          })
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

  getCandIndustry(cid, cycle)
    .then((result) => {
      return Promise.all([cacheKeys(cid, result[0]),
                          cacheCandInfo(result[1]),
                          cacheCandIndustry(result[2])]);
      res.send({'candIndustry': result, 'source': 'OpenSecrets API'});
    })
    .catch((err) => {
      res.status(500).send(err.message);
      next(err);
    });
});

export default router;
