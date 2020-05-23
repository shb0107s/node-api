const app = require('../index.js');
const syncDb = require('./sync-db');

syncDb().then(_ => {  // _는 인자를 사용하지 않겠다는 의미(관습)
  console.log('Sync database!');
  app.listen(3000, () => {
    console.log('Server is running on 3000 port!');
  });
})
