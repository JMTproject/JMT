const { DataTypes } = require('sequelize');

const cookingStep = (seq) => {
  return seq.define('cookingStep', {
    stepId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    step: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    stepImg: {
      type: DataTypes.TEXT,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipes',
        key: 'recipeId',
      },
    },
  });
};

module.exports = cookingStep;
