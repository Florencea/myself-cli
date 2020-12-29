const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

async function crawler () {
  console.log('\n更新離線資料庫(將爬取所有已完結番組資料，需要一段時間)\n')
  const response = await axios.get('https://myself-bbs.com/forum-113-1.html')
  const $ = cheerio.load(response.data)
  const page = parseInt($($('.last')[0]).text().split(' ')[1])
  const db = {}
  const spinner = ora().start()
  spinner.color = 'cyan'
  for (let i = 0; i < page; i++) {
    const res = await axios.get(`https://myself-bbs.com/forum-113-${i + 1}.html`)
    const $$ = cheerio.load(res.data)
    for (const l of $$('a[onclick="atarget(this)"]')) {
      if ($$(l).text().trim() !== '') {
        const id = $$(l).attr('href').split('-')[1]
        const name = $$(l).text()
        db[id] = name
      }
    }
    spinner.text = `已爬取第 ${i + 1} / ${page} 頁\n`
  }
  spinner.stop()
  const dbArr = []
  for (const [key, value] of Object.entries(db)) {
    dbArr.push({ id: key, name: value })
  }
  dbArr.sort((a, b) => a.id - b.id)
  const dbObj = {
    timestamp: moment(),
    data: dbArr
  }
  const dbJson = JSON.stringify(dbObj, null, 2)
  fs.writeFileSync(path.join(__dirname, 'db_new.json'), dbJson)
  console.log(`資料庫更新完成，共 ${dbArr.length} 筆結果\n`)
}

crawler()
