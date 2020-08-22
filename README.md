instructions to use:

1. download to your computer
2. "npm install" in entry folder
3. "npm install" in all "sys..." folders
4. "npm run sysA" OR "... sysB" OR "... sysC" will run chosen system only
5. "npm start" in entry folder will run them all - togather
6. sysA is at "localhost:3000",sysB is at "localhost:4000" and sysC is at "localhost:5000"
7. to run sysB you have to run Redis version 6.0.6 on docker (http://download.redis.io/releases/redis-6.0.6.tar.gz) =>
the command to run redis on docker is "docker run --name <the name of your container> -p 7001:6379 -d redis"
8. redis has to be configured with password "Neska1994" ("config set requiepass Neska1994" - in redis cli)
9. sysC uses mongoDB on cloud Atlas => https://cloud.mongodb.com/
10. kafka cloud now used is aiven.io => https://aiven.io

*use my user in all these cloud platfrorms - emial: evgenyv94@gmail.com
pass: Neska1994
