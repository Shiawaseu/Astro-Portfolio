import Redis from 'ioredis'

const redis = new Redis({
  host: import.meta.env["REDIS_HOST"], 
  port: Number(import.meta.env["REDIS_PORT"]), 
  password: import.meta.env["REDIS_PASSWORD"], 
});

export default redis