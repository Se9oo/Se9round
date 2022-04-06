const fs = require('fs');

const generatedSitemap = `
User-agent: *
Disallow: /pages/404
Disallow: /pages/500
Disallow: /pages/admin
Disallow: /pages/_app
Disallow: /pages/_document
Disallow: /pages/editPost
Disallow: /pages/index
Disallow: /pages/postManage
Disallow: /pages/post/[postTItle]/modify
`;

fs.writeFileSync('../public/robots.txt', generatedSitemap, 'utf8');
