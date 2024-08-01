const { DataTypes } = require('sequelize');

const recipe = (seq) => {
    return seq.define('recipe', {
        recipeId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        recipeTitle : { 
            type : DataTypes.STRING(31),
            allowNull : false,
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        mainImg : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        servings : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        cookingTime :{ 
            type : DataTypes.INTEGER(2),
            allowNull : false,
        },
        rating : {
            type : DataTypes.DECIMAL,
            defaultValue : 0,
        },
        userId : {
            type : DataTypes.INTEGER,
            references :{
                model: 'users',
                key: 'userId',
            }
        }
    })
}

module.exports = recipe;