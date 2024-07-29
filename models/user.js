const { DataTypes } = require('sequelize')

const user = (seq) => {
    return seq.define('user', {
        userId : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        email: {
            type: DataTypes.STRING(31),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickName: {
            type: DataTypes.STRING(121),
            allowNull: false,
        },
        profileImg : {
            type : DataTypes.TEXT,
            allowNull : false,
            defaultValue : "../images/profileDeafultImg.png",
        },
        aboutMe : {
            type : DataTypes.TEXT,
            allowNull : false,
            defaultValue : '',
        },
        isEnabled : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : true,
        }
    })
}

module.exports = user;