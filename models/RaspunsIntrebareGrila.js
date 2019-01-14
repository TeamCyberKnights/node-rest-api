const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize


const RaspunsIntrebareGrila = sequelize.define('raspuns_intrebare_grila', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    intrebareId: {
        type: Sequelize.INTEGER
    },
    punctajObtinut: {
        type: Sequelize.FLOAT
    },
    secunde: {
        type: Sequelize.INTEGER
    },
    rezultatTestStudentId: {
        type: Sequelize.INTEGER
    }

})

module.exports =  RaspunsIntrebareGrila
