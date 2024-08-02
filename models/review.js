const { DataTypes } = require('sequelize');

const review = (seq) => {
    return seq.define('review', {
        reviewId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        rating : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        reviewImg : {
            type : DataTypes.TEXT,
        },
        isEnabled : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : true,
        },
        userId : {
            type : DataTypes.INTEGER,
            references : {
                model: 'users',
                key: 'userId',
            }
        },
        recipeId : {
            type : DataTypes.INTEGER,
            references : {
                model : 'recipes',
                key : 'recipeId',
            },
        },

    })
}

module.exports = review;