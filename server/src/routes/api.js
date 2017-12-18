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

  // Check for industry keys in redis cache
  findKeys(key)
    .then((keys) => {
      let source;

      if (keys) {
        // Keys found, define source
        source = 'redis cache';

        // Fetch candidate info and industries from redis cache by keys
        return Promise.all([findOne(`candInfo:${cid}${cycle}`), source, findMultiple(JSON.parse(keys))]);
      } else {
        // Keys not found, define source
        source = 'opensecrets api';

        // Fetch candidate info and industries from opensecrets api by cid and cycle
        return Promise.all([getCandIndustry(cid, cycle), source]);
      }
    })
    .then((result) => {
      const source = result[1];

      // Check data source
      if (source === 'redis cache') {
        const candInfo = result[0];
        const candIndustry = result[2];

        // Send candidate data as JSON object (object, array, string)
        res.json({ 'candInfo': candInfo, 'candIndustry': candIndustry, 'source': source});
      } else if (source === 'opensecrets api') {
        const industries = result[0];

        // Cache industry keys, candidate info, and industries
        return Promise.all([cacheKeys(key, industries[0]),
                            cacheCandInfo(industries[1]),
                            cacheCandIndustry(key, industries[2]),
                            source]);
      }
    })
    .then((result) => {
      if (result) {
        const candInfo = result[1];
        const candIndustry = result[2];
        const source = result[3];

        // Send candidate data as JSON object (object, array, string)
        res.json({ 'candInfo': candInfo, 'candIndustry': candIndustry, 'source': source});
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
      next(err);
    });
});

export default router;
