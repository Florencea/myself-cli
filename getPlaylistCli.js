const getPlaylist = require('./getPlaylist');
const ora = require('ora');

console.log('');
const spinner = ora('讀取中...\n').start();

getPlaylist(process.argv[2], (result) => {
  spinner.stop();
  const title = result.title.split('【')[0];
  console.log(` ID: ${process.argv[2]}\n ${title}\n`);
  for (const item of result.data) {
    const no = item.link.split('/')[5];
    console.log(` [編號: ${no}] ${item.name}`);
  }
  console.log(`\n使用 「myself-cli -p ${process.argv[2]} 編號」 播放「${title}」`);
  console.log(`使用 「myself-cli -d ${process.argv[2]} 編號」 下載「${title}」`);
  console.log(`\n或前往網頁連結： https://myself-bbs.com/thread-${process.argv[2]}-1-1.html\n`);
});
