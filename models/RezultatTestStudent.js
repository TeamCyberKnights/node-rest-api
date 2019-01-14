const Sequelize = require('sequelize')
const sequelize =  require('../config/db-connection').sequelize

const RaspunsIntrebareGrila= require('./RaspunsIntrebareGrila')

const RezultatTestStudent = sequelize.define('rezultat_test_student', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    testId: {
        type: Sequelize.INTEGER
    },
    data: {
        type: Sequelize.STRING
    },
    minuteTrecute : {
        type: Sequelize.INTEGER
    },
    promovat: {
        type: Sequelize.BOOLEAN
    },
    testSustinutId: {
        type: Sequelize.INTEGER
    }

});
RezultatTestStudent.hasMany(RaspunsIntrebareGrila ,{foreignKey: 'rezultatTestStudentId', sourceKey: 'id',foreignKeyConstraint: true})
module.exports =  RezultatTestStudent

