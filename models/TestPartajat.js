const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const TestPartajat = sequelize.define('test_partajat', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    testId: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    profesorId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports =  TestPartajat