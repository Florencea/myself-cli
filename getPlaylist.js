const axios = require('axios');
const cheerio = require('cheerio');

function getPlaylist(id, callback) {
  const url = `https://myself-bbs.com/thread-${id}-1-1.html`;
  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const title = $('title').text().split(' - 動畫連載列表')[0];
      const d = [];
      for (const n of $('.main_list > li')) {
        for (const nn of $(n).children('ul').children('li')) {
          if ($(nn).text() === '站內') {
            const dd = {
              name: $(n).children('a').text(),
              link: `https://v.myself-bbs.com/vpx/${id}/${$(nn)
                .children('a')
                .attr('data-href')
                .split('/')
                .pop()
                .trimEnd()}/`,
            };
            d.push(dd);
          }
        }
      }
      const ddd = {
        title: title,
        data: d,
      };
      callback(ddd);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = getPlaylist;
