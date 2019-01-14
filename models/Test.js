const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const IntrebareGrila = require('./IntrebareGrila')
//const TestSustinut = require('./TestSustinut')
const TestPartajat = require('./TestPartajat')

const Test = sequelize.define('test', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nume : {
        type: Sequelize.STRING
    },
    descriere : {
        type: Sequelize.STRING,
        allowNull:false
    },
    timp_disponibil : {
        type: Sequelize.STRING,
        allowNull:false
    },
    estePublic : {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    materie : {
        type: Sequelize.STRING,
        allowNull:false
    }

})

//Test.hasMany(IntrebareGrila,{foreignKey: 'testId', sourceKey: 'id',foreignKeyConstraint: true})

Test.hasMany(TestPartajat,{foreignKey: 'testId', sourceKey: 'id',foreignKeyConstraint: true})
module.exports =  Test
