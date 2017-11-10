import redis from 'redis';
// let cache = new (require('node-redis-cache'))();

// Create new redis client and connect to redis instance
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.log(`Error: ${err}`);
});

/**
 * Fetch legislators from the cache
 *
 * @param  {String} id
 * @return {Promise<Object>}
 */
 const findLegislators = (keys) => new Promise((resolve, reject) => {
   const legislators = keys.map((key) => {
     return redisClient.hgetall(key, (err, response) => {
       if (err) {
         reject(err);
       } else {
         console.log(`response: ${response}`);
         return response;
       }
     });
   });
   console.log(legislators);
   resolve(legislators);
 });

 /**
  * Fetch legislators from the cache
  *
  * @param  {String} id
  * @return {Promise<Object>}
  */
  const findLegislatorKeys = (key) => new Promise((resolve, reject) => {
    redisClient.get(key, (err, keys) => {
      err ? reject(err) : resolve(keys)
    });
  });

 /**
  * Store legislators in the cache
  *
  * @param  {Object} id
  * @return {Promise<Object>}
  */
  const cacheLegislators = (legislators) => new Promise((resolve, reject) => {
    legislators.forEach((legislator) => {
      redisClient.hmset(`legislators:${legislator.cid}`, 'cid', legislator.cid,
                        'firstlast', legislator.firstlast, 'party', legislator.party,
                        'gender', legislator.gender, 'elected', legislator.elected,
                        'twitterID', legislator.twitterID, 'congressoffice', legislator.congressoffice,
                        'birthdate', legislator.birthdate);
      redisClient.expire(`legislators:${legislator.cid}`, 30);
    });
    resolve(legislators);
  });

  /**
   * Store legislators in the cache
   *
   * @param  {Object} id
   * @return {Promise<Object>}
   */
   const cacheLegislatorKeys = (key, legislatorKeys) => new Promise((resolve, reject) => {
     redisClient.setex(key, 30, JSON.stringify(legislatorKeys));
     resolve(legislatorKeys);
   });

 export { findLegislators, findLegislatorKeys, cacheLegislators, cacheLegislatorKeys };
