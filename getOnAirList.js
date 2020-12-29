const axios = require('axios')
const cheerio = require('cheerio')

async function getOnAirList (callback) {
  const response = await axios.get('https://myself-bbs.com/forum-133-1.html')
  const $ = cheerio.load(response.data)
  const page = Math.ceil(parseInt($($('.xi1')[1]).text()) / 20)
  const db = {}
  for (let i = 0; i < page; i++) {
    const res = await axios.get(`https://myself-bbs.com/forum-133-${i + 1}.html`)
    const $$ = cheerio.load(res.data)
    for (const l of $$('a[onclick="atarget(this)"]')) {
      if ($$(l).text().trim() !== '') {
        const id = $$(l).attr('href').split('-')[1]
        const name = $$(l).text()
        db[id] = name
      }
    }
  }
  const dbArr = []
  for (const [key, value] of Object.entries(db)) {
    dbArr.push({ id: key, name: value })
  }
  dbArr.sort((a, b) => a.id - b.id)
  callback(dbArr)
}

module.exports = getOnAirList
