'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize); //user 테이블
db.Recipe = require('./recipe')(sequelize); //recipe 테이블
db.Review = require('./review')(sequelize); //review 테이블

db.Ingredient = require('./ingredient')(sequelize); //재료 테이블
db.CookingTools = require('./cookingTools')(sequelize); //조리도구 테이블
db.CookingStep = require('./cookingStep')(sequelize); //조리과정 테이블

// 유저 : 레시피 / 1 : 다
db.User.hasMany(db.Recipe, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Recipe.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE' });

// 유저 : 리뷰 / 1 : 다
db.User.hasMany(db.Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Review.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE' });

// 레시피 글 : 리뷰 / 1 : 다
db.Recipe.hasMany(db.Review, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
db.Review.belongsTo(db.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });

// 레시피 긇 : 재료 / 1 : 다
db.Recipe.hasMany(db.Ingredient, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
db.Ingredient.belongsTo(db.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });

// 레시피 긇 : 조리도구 / 1 : 다
db.Recipe.hasMany(db.CookingTools, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
db.CookingTools.belongsTo(db.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });

// 레시피 긇 : 조리도구 / 1 : 다
db.Recipe.hasMany(db.CookingStep, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
db.CookingStep.belongsTo(db.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
