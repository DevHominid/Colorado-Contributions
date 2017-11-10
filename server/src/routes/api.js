import express from 'express';
import { findLegislators, findLegislatorKeys, cacheLegislators, cacheLegislatorKeys } from '../database';
import { getLegislators } from '../services';

const router = express.Router();

// router.get('/legislators/:id', (req, res, next) => {
//   const id = req.params.id;
//
//   findLegislators(id)
//     .then((legislators) => {
//       if (legislators) {
//         res.send({ "legislators": legislators, "source": "redis cache" });
//       } else {
//         const query = { id: id};
//         getLegislators(query)
//           .then((legislators) => {
//             cacheLegislators(id, legislators)
//               .then((legislators) => {
//                 res.send({"legislators": legislators, "source": "OpenSecrets API" });
//               })
//           })
//       }
//     })
//     .catch((err) => {
//       res.status.send(500).send(err.message);
//       next(err);
//     });
// });

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

export default router;
