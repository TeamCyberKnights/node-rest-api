const Sequelize = require('sequelize')


const sequelize =  require('../config/db-connection').sequelize

const RezultatTestStudent = require('./RezultatTestStudent')

const Echipa = require('./Echipa')

const Student = sequelize.define('student', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    utilizator: {
        type: Sequelize.STRING
    },
    nume : {
        type: Sequelize.STRING
    },
    prenume : {
        type: Sequelize.STRING
    },
    parola: {
        type: Sequelize.STRING
    },
    mail : {
        type: Sequelize.STRING,
        validate : {
            isEmail : true
        }
    }


})
Student.hasMany(RezultatTestStudent,{foreignKey: 'studentId', sourceKey: 'id',foreignKeyConstraint: true})
Student.hasMany(Echipa,{foreignKey: 'studentId', sourceKey: 'id',foreignKeyConstraint: true})
module.exports =  Student

