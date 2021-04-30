const db = require('./db.json');
const moment = require('moment');

console.log('\n從離線資料庫讀取\n');
for (const item of db.data) {
  console.log(` [ID: ${item.id}] ${item.name}`);
}
console.log(`\n 離線資料庫最後更新於 ${moment(db.timestamp).format('YYYY-MM-DD HH:mm:ss')}`);
console.log(` 共 ${db.data.length} 筆結果，建議使用「myself-cli -a | grep 關鍵字」進行搜尋\n`);
