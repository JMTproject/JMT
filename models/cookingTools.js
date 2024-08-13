const { DataTypes } = require('sequelize');

const cookingTools = (seq) => {
    return seq.define('cookingTools', {
        toolId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        toolName : {
            type : DataTypes.STRING(91),
            allowNull : false,
        },
        recipeId : {
            type : DataTypes.INTEGER,
            references :{
                model: 'recipes',
                key: 'recipeId',
            }
        }
    })
}

module.exports = cookingTools;