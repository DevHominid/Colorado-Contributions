import redis from 'redis';

// Create new redis client and connect to redis instance
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.log(`Error: ${err}`);
});
