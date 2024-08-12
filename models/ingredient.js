const { DataTypes } = require('sequelize');

const ingredient = (seq) => {
    return seq.define('ingredient', {
        ingredientId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        ingredientNum :{
            type : DataTypes.INTEGER(2),
            allowNull : false,
        },
        ingredientName : {
            type : DataTypes.STRING(91),
            allowNull : false,
        },
        quantity : {
            type : DataTypes.STRING(31),
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

module.exports = ingredient;