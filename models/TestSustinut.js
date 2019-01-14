const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize
const RaspunsStudent = require('./RaspunsIntrebareGrila')
const Student = require('./Student')

const RezultatTestStudent= require('./RezultatTestStudent')
const TestSustinut = sequelize.define('test_sustinut', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    profesorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

TestSustinut.hasMany(RezultatTestStudent, {foreignKey: 'testSustinutId', sourceKey: 'id',foreignKeyConstraint: true})
module.exports = TestSustinut

