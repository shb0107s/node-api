const models = require('../models');

module.exports = () => {
  return models.sequelize.sync({force: false});  // 기존에 DB가 있더라도 날리고 강제로 새로 만듬
  // models.sequelize.sync는 내부적으로 promise를 return한다.
  // 따라서 비동기 처리를 할 수 있다.
};
