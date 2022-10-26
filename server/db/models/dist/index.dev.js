'use strict';

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var process = require('process');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../../config/database.json')[env];

var db = {};
var sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); // Category.hasMany(Site)

db.sequelize = sequelize;
db.Sequelize = Sequelize; // db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.Category.hasMany(db.Site, {
  as: "sites",
  onDelete: "cascade",
  hooks: true
});
db.Site.belongsTo(db.Category, {
  foreignKey: "categoryId",
  as: "category"
});
module.exports = db;