const getOnAirList = require('./getOnAirList')
const ora = require('ora')

console.log('')
const spinner = ora('讀取中...\n').start()
spinner.color = 'cyan'
getOnAirList(result => {
  spinner.stop()
  for (const item of result) {
    console.log(` [ID: ${item.id}] ${item.name}`)
  }
  console.log('\n使用「myself-cli -l ID」取得該番組劇集列表\n')
})
