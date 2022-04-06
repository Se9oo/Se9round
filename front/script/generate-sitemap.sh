cd ./home/Se9round/front/public

rm -rf sitemap.xml

cd ..
cd script

node robots.js
node sitemap.js

curl http://google.com/ping?sitemap=https://se9round.dev/sitemap.xml