const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const VariantaRaspuns = sequelize.define('varianta_raspuns', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    corect: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    intrebareId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = VariantaRaspuns

