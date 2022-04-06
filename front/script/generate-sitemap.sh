#!/usr/bin/env sh
cd /home/Se9round/front/public

rm -rf sitemap.xml

/root/.nvm/versions/node/v16.14.2/bin/node /home/Se9round/front/script/robots.js
/root/.nvm/versions/node/v16.14.2/bin/node /home/Se9round/front/script/sitemap.js