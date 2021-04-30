const axios = require('axios');

async function getVideoLink(id, no) {
  try {
    const url = `https://v.myself-bbs.com/vpx/${id}/${no}/`;
    const response = await axios.get(url);
    const d = response.data;
    const host = d.host.sort((a, b) => b.weight - a.weight)[0].host;
    const playlist = d.video['720p'];
    const videoLink = `${host}${playlist}`;
    return videoLink;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getVideoLink;
