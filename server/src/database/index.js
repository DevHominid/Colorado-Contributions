import redis from 'redis';

// Create new redis client and connect to redis instance
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOSTNAME,
                                       {no_ready_check: true});
redisClient.auth(process.env.REDIS_PASS, (err) => {
  if (err) throw err;
});
redisClient.on('connect', () => {
  console.log(`Connected to Redis`);
});

/**
 * Fetch keys array from the cache
 *
 * @param  {String} key
 * @return {Promise<Object>}
 */
 const findKeys = (key) => new Promise((resolve, reject) => {
   redisClient.get(key, (err, keys) => {
     err ? reject(err) : resolve(keys)
   });
 });

/**
 * Fetch a single object from the cache by key
 *
 * @param  {String} key
 * @return {Promise<Object>}
 */
 const findOne = (key) => new Promise((resolve, reject) => {
   redisClient.hgetall(key, (err, item) => {
     err ? reject(err) : resolve(item)
   });
 });

/**
 * Fetch multiple objects from the cache by keys
 *
 * @param  {Array} keys
 * @return {Promise<Array>}
 */
 const findMultiple = (keys) => new Promise((resolve, reject) => {
   const items = Promise.all(keys.map((key) => {
     return findOne(key);
   }))
   .then((items) => {
     resolve(items);
   })
   .catch((err) => {
     reject(err);
   });
 });

  /**
   * Store array of keys in the cache
   *
   * @param  {String} key
   * @param  {Array} keys
   * @return {Promise<Array>}
   */
   const cacheKeys = (key, keys) => new Promise((resolve, reject) => {
     redisClient.setex(key, 300, JSON.stringify(keys));
     resolve(keys);
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
      redisClient.expire(`legislators:${legislator.cid}`, 300);
    });
    resolve(legislators);
  });

  /**
   * Store candidate info in the cache
   *
   * @param  {Object} candInfo
   * @return {Promise<Object>}
   */
   const cacheCandInfo = (candInfo) => new Promise((resolve, reject) => {
     redisClient.hmset(`candInfo:${candInfo.cid}${candInfo.cycle}`, 'name', candInfo.name,
                       'cid', candInfo.cid, 'cycle', candInfo.cycle,
                       'source', candInfo.source, 'lastUpdated', candInfo.lastUpdated);
     redisClient.expire(`candInfo:${candInfo.cid}${candInfo.cycle}`, 300);
     resolve(candInfo);
   });

  /**
   * Store candidate industries in the cache
   *
   * @param  {Array} industryArray
   * @return {Promise<Object>}
   */
   const cacheCandIndustry = (key, industryArray) => new Promise((resolve, reject) => {
     industryArray.forEach((industry) => {
       redisClient.hmset(`candIndustry:${key}${industry.code}`, 'code', industry.code,
                         'name', industry.name, 'indivs', industry.indivs,
                         'pacs', industry.pacs, 'total', industry.total);
       redisClient.expire(`candIndustry:${key}${industry.code}`, 300);
     });
     resolve(industryArray);
   });

 export {
   findKeys,
   findOne,
   findMultiple,
   cacheKeys,
   cacheLegislators,
   cacheCandInfo,
   cacheCandIndustry
 };
