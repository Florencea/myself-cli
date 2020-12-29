const getPlaylist = require('./getPlaylist')
const getVideoLink = require('./getVideoLink')
const downloadVideo = require('./downloadVideo')
const ora = require('ora')

console.log('')
const spinner = ora('讀取中...\n').start()
spinner.color = 'cyan'

getPlaylist(process.argv[2], (result) => {
  const title = result.title.split('【')[0]
  let videoName = ''
  for (const item of result.data) {
    const no = item.link.split('/')[5]
    if (no === process.argv[3]) {
      videoName = item.name
    }
  }
  const filename = `${title} ${videoName}.mp4`
  spinner.text = `下載 ${filename} ...\n`
  getVideoLink(process.argv[2], process.argv[3])
    .then(link => {
      downloadVideo(link, filename, () => {
        spinner.stop()
        console.log(`  下載 ${filename} ...完成`)
      })
    })
})
