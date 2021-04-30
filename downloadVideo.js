const { exec } = require('child_process');
const ora = require('ora');
const moment = require('moment');

function statusTime(sec) {
  if (sec < 60) {
    return `${sec} 秒`;
  } else if (sec < 3600) {
    return `${Math.floor(sec / 60)} 分 ${sec % 60} 秒`;
  } else {
    return `${Math.floor(sec / 3600)} 時 ${Math.floor((sec % 3600) / 60)} 分 ${sec % 60} 秒`;
  }
}

function downloadVideo(link, filename, callback) {
  const dlPath = `~/Downloads/${filename}`;
  // const ytdl = spawn('youtube-dl', [link, '--no-part', '--output', dlPath])
  const ytdl = exec(`youtube-dl '${link}' --no-part --output '${dlPath}'`);
  const spinner = ora(`解析 ${filename}\n`).start();
  const today = moment().format('YYYY-MM-DD');
  let dur = '';
  ytdl.stdout.on('data', (data) => {
    if (data.includes('Duration')) {
      dur = moment(`${today} ${data.split('Duration: ')[1].split(',')[0].split('.')[0]}`).diff(
        moment(today),
        'seconds',
      );
    }
  });
  ytdl.stderr.on('data', (data) => {
    if (data.includes('Duration')) {
      dur = moment(`${today} ${data.split('Duration: ')[1].split(',')[0].split('.')[0]}`).diff(
        moment(today),
        'seconds',
      );
    }
    if (data.includes('time=')) {
      const downloaded = moment(`${today} ${data.split('time=')[1].split(' ')[0].split('.')[0]}`).diff(
        moment(today),
        'seconds',
      );
      const speed = data.split('speed=')[1].split('x')[0];
      const statusPercent = Math.ceil((downloaded / dur) * 100);
      const statusStr =
        statusPercent === 100
          ? '正在完成下載'
          : `已下載 ${Math.ceil((downloaded / dur) * 100)} % - 大約還有 ${statusTime(
              Math.ceil((dur - downloaded) / speed),
            )}`;
      spinner.text = `下載 ${filename} - ${statusStr} \n`;
    }
  });
  ytdl.on('exit', () => {
    spinner.stop();
    callback();
  });
}

module.exports = downloadVideo;
