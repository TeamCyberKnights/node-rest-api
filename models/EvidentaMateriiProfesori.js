const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Materie = require('./Materie')
const Profesor = require('./Profesor')

const EvidentaMateriiProfesori = sequelize.define("evidenta_materii_profesori", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    }
})

Profesor.belongsToMany(Materie, {as: 'Materii',
    through: 'evidenta_materii_profesori', foreignKey: 'profesorId',constraints: false
})
// Materie.belongsToMany(Profesor, {as: 'Profesori',
//     through: 'evidenta_materii_profesori', foreignKey: 'materieId',constraints: false
// })


module.exports =  EvidentaMateriiProfesori
