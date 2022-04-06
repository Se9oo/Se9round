#!/usr/bin/env sh
cd /home/Se9round/front

npx pm2 kill

npm run build

npx pm2 start npm -- start

curl http://google.com/ping?sitemap=https://se9round.dev/sitemap.xml

