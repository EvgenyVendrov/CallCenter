instructions to use:

1. download to your computer
2. npm init the floder
3. npm install in external folder - you may need to do it in all system folders
4. npm run sysA\sysB\sysC will run chosen system 
5. npm start in external folder to run them all
6. sysA is at "localhost:3000",sysB is at "localhost:4000",sysC is at "localhost:5000"
7. to run sysB you have to run Redis version 6.0.6 on docker (http://download.redis.io/releases/redis-6.0.6.tar.gz) =>
the command to run redis on docker is "docker run --name <the name of your container> -p 7001:6379 -d redis"
8. redis has to be configured with password "Neska1994" (config set requiepass Neska1994 - in redis cli)
8. sysC uses mongoDB on cloud Atlas
9. kafka cloud now used is aiven.io
