const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

function statusTime (sec) {
  if (sec < 60) {
    return `${sec} 秒`
  } else if (sec < 3600) {
    return `${Math.floor(sec / 60)} 分 ${sec % 60} 秒`
  } else {
    return `${Math.floor(sec / 3600)} 時 ${Math.floor((sec % 3600) / 60)} 分 ${sec % 60} 秒`
  }
}

async function crawler () {
  console.log('\n更新離線資料庫 (將讀取所有已完結番組資料，需要一段時間，請耐心等候)\n')
  const firstPageResponse = await axios.get('https://myself-bbs.com/forum-113-1.html')
  const $ = cheerio.load(firstPageResponse.data)
  const totalPage = parseInt($($('.last')[0]).text().split(' ')[1])
  const bangumiMap = new Map()
  const statusSpinner = ora('讀取中\n').start()
  let processTimeDeltaTotal = 0
  for (let currentPage = 1; currentPage < totalPage; currentPage++) {
    const processTimeStart = moment()
    const pageResponse = await axios.get(`https://myself-bbs.com/forum-113-${currentPage}.html`)
    const $$ = cheerio.load(pageResponse.data)
    for (const bangumiItem of $$('a[onclick="atarget(this)"]')) {
      if ($$(bangumiItem).text().trim() !== '') {
        const bangumiId = $$(bangumiItem).attr('href').split('-')[1]
        const bangumiName = $$(bangumiItem).text()
        bangumiMap.set(bangumiId, bangumiName)
      }
    }
    const processTimeEnd = moment()
    const processTimeDelta = processTimeEnd.diff(processTimeStart, 'milliseconds') / 1000
    processTimeDeltaTotal += processTimeDelta
    const processTimeDeltaAvg = processTimeDeltaTotal / currentPage
    statusSpinner.text = `已完成 ${Math.ceil((currentPage / totalPage) * 100)} % - 大約還有 ${statusTime(Math.ceil(processTimeDeltaAvg * (totalPage - currentPage)))}\n`
  }
  statusSpinner.stop()
  const bangumiArr = []
  for (const [bangumiId, bangumiName] of bangumiMap) {
    bangumiArr.push({ id: bangumiId, name: bangumiName })
  }
  bangumiArr.sort((a, b) => a.id - b.id)
  const bangumiJson = JSON.stringify({
    timestamp: moment(),
    data: bangumiArr
  }, null, 2)
  fs.writeFileSync(path.join(__dirname, 'db_new.json'), bangumiJson)
  console.log(`資料庫更新完成，共 ${bangumiArr.length} 筆結果\n`)
}

crawler()
