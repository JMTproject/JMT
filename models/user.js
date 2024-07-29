const { DataTypes } = require('sequelize')

const user = (seq) => {

    return seq.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}

module.exports = user