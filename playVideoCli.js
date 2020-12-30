const getPlaylist = require('./getPlaylist')
const getVideoLink = require('./getVideoLink')
const playVideo = require('./playVideo')
const ora = require('ora')

console.log('')
const spinner = ora('讀取中...\n').start()

getPlaylist(process.argv[2], (result) => {
  spinner.stop()
  const title = result.title.split('【')[0]
  let videoName = ''
  for (const item of result.data) {
    const no = item.link.split('/')[5]
    if (no === process.argv[3]) {
      videoName = item.name
    }
  }
  console.log(` 開啟 IINA 播放「${title}」${videoName}\n`)
  getVideoLink(process.argv[2], process.argv[3])
    .then(link => {
      playVideo(link)
    })
})
