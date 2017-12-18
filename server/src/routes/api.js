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

// Fetch legislators keys from cache
// if keys found, fetch legislators from cache and send in res
// else, fetch legislators + keys from API, store in cache, and send in res
router.get('/legislators/:id', (req, res, next) => {
  const id = req.params.id;

  // Check for legislator keys in redis cache by id (state i.e. 'CO')
  findKeys(id)
    .then((keys) => {
      let source;

      if (keys) {
        // Keys found, define source
        source = 'redis cache';

        // Fetch each legislator from redis cache by key
        return Promise.all([findMultiple(JSON.parse(keys)), source]);
      } else {
        // Keys not found, define query and source
        const query = { id: id };
        source = 'opensecrets api';

        // Fetch legislators from opensecrets api by id (state i.e. 'CO')
        return Promise.all([getLegislators(query), source]);
      }
    })
    .then((result) => {
      const legislators = result[0];
      const source = result[1];

      // Check data source
      if (source === 'redis cache') {
        // Send legislator data as JSON object (array, string)
        res.json({ 'legislators': legislators, 'source': source});
      } else if (source === 'opensecrets api') {
        // Cache legislators and their respective keys
        return Promise.all([cacheLegislators(legislators[1]), cacheKeys(id, legislators[0]), source])
      }
    })
    .then((result) => {
      // Check for result
      if (result) {
        const legislators = result[0];
        const source = result[2];

        // Send legislator data as JSON object (array, string)
        res.json({'legislators': result[0], 'source': source});
      } else {
        return;
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
