const Sequelize = require('sequelize')
const sequelize =  require('../config/db-connection').sequelize

const Test = require('./Test')
const Materie = require('./Materie')
const IntrebareGrila = require('./IntrebareGrila')
const TestPartajat = require('./TestPartajat')
const TestSustinut = require('./TestSustinut')
const Profesor = sequelize.define('profesor', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    utlizator: {
        type: Sequelize.STRING
    },
    nume: {
        type: Sequelize.STRING
    },
    prenume : {
        type: Sequelize.STRING
    },
    parola : {
        type : Sequelize.STRING
    },
    mail : {
        type: Sequelize.STRING,
        validate : {
            isEmail : true
        }
    }
});

Profesor.hasMany(Materie, {foreignKey: 'profesorId', sourceKey: 'id',foreignKeyConstraint:true})
Profesor.hasMany(IntrebareGrila, {foreignKey: 'profesorId', sourceKey: 'id',foreignKeyConstraint:true})
Profesor.hasMany(Test, {foreignKey: 'profesorId', sourceKey: 'id',foreignKeyConstraint:true})
Profesor.hasMany(TestPartajat, {foreignKey: 'profesorId', sourceKey: 'id',foreignKeyConstraint:true})
Profesor.hasMany(TestSustinut, {foreignKey: 'profesorId', sourceKey: 'id',foreignKeyConstraint:true})


module.exports =  Profesor