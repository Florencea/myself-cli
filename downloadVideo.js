const { spawn } = require('child_process')

function downloadVideo (link, filename, callback) {
  const dlPath = `~/Downloads/${filename}`
  const ytdl = spawn('youtube-dl', [link, '--no-part', '--output', dlPath])
  ytdl.on('exit', () => {
    callback()
  })
}

module.exports = downloadVideo
