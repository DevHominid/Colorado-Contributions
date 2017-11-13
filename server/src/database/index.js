import redis from 'redis';
// let cache = new (require('node-redis-cache'))();

// Create new redis client and connect to redis instance
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.log(`Error: ${err}`);
});

/**
 * Fetch legislator keys from the cache
 *
 * @param  {String} key
 * @return {Promise<Object>}
 */
 const findLegislatorKeys = (key) => new Promise((resolve, reject) => {
   redisClient.get(key, (err, keys) => {
     err ? reject(err) : resolve(keys)
   });
 });

/**
 * Fetch a single legislator from the cache by key
 *
 * @param  {String} key
 * @return {Promise<Object>}
 */
 const findLegislator = (key) => new Promise((resolve, reject) => {
   redisClient.hgetall(key, (err, legislator) => {
     err ? reject(err) : resolve(legislator)
   });
 });

/**
 * Fetch multiple legislators from the cache by keys
 *
 * @param  {Array} keys
 * @return {Promise<Object>}
 */
 const findLegislators = (keys) => new Promise((resolve, reject) => {
   const legislators = Promise.all(keys.map((key) => {
     return findLegislator(key);
   }))
   .then((legislators) => {
     resolve(legislators);
   })
   .catch((err) => {
     reject(err);
   });
 });

  /**
   * Store legislator keys in the cache
   *
   * @param  {Object} key
   * @param  {Object} legislatorKeys
   * @return {Promise<Object>}
   */
   const cacheLegislatorKeys = (key, legislatorKeys) => new Promise((resolve, reject) => {
     redisClient.setex(key, 30, JSON.stringify(legislatorKeys));
     resolve(legislatorKeys);
   });

 /**
  * Store legislators in the cache
  *
  * @param  {Array} legislators
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
   * Store candidate industries in the cache
   *
   * @param  {Array} industryArray
   * @return {Promise<Object>}
   */
   const cacheCandIndustry = (industryArray) => new Promise((resolve, reject) => {
     industries.forEach((industry) => {
       redisClient.hmset(`candIndustry:${industry.code}`, 'code', industry.code,
                         'name', industry.name, 'indivs', industry.indivs,
                         'pacs', industry.pacs, 'total', industry.total);
       redisClient.expire(`candIndustry:${industry.code}`, 30);
     });
     resolve(industryArray);
   });

 export { findLegislator, findLegislators, findLegislatorKeys, cacheLegislators, cacheLegislatorKeys };
