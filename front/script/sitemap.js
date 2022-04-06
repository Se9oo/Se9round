// 패키지 설치
const fs = require('fs');
const globby = require('globby');
const axios = require('axios');

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const DOMAIN = 'https://se9round.dev';

(async () => {
  const { data } = await axios({
    url: 'https://api.se9round.dev/api/posts',
    method: 'get',
  });

  // 동적 페이지 생성
  const postList = `
    ${data
      .map((post) => {
        return `
        <url>
          <loc>${`${DOMAIN}/post/${post.title}`}</loc>
          <lastmod>${getDate}</lastmod>
        </url>`;
      })
      .join('')}
    `;

  // 포함할 페이지와 제외할 페이지 등록
  const pages = await globby([
    // include
    '../pages/home.js',
    '../pages/search.js',
    // exclude
    '!../pages/_app.js',
    '!../pages/_document.js',
    '!../pages/404.js',
    '!../pages/500.js',
    '!../pages/admin.js',
    '!../pages/editPost.js',
    '!../pages/postManage.js',
    '!../pages/index.js',
    '!../pages/post/[postTitle]/index.js',
    '!../pages/post/[postTitle]/modify.js',
  ]);

  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace('../pages/', '')
          .replace('.js', '')
          .replace(/\/index/g, '');
        const routePath = path === 'index' ? '' : path;
        return `
          <url>
            <loc>${DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
      })
      .join('')}`;

  const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${pagesSitemap}
      ${postList}
    </urlset>`;

  fs.writeFileSync('/home/Se9round/front/public/sitemap.xml', generatedSitemap, 'utf8');
})();
