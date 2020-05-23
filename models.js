const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false  // 기본 값은 console.log()와 바인딩 되어있다.
});

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,  // varchar 255
    unique: true
  }
}, {
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: 'User'
});  // id는 자동으로 생성해준다.

module.exports = {Sequelize, sequelize, User};
