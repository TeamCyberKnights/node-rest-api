const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const VariantaRaspuns = require('./VariantaRaspuns')
const IntrebareGrila = sequelize.define('intrebare_grila', {

    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    text: {
        type: Sequelize.STRING,
        allowNull:false
    },
    materie: {
        type: Sequelize.STRING,
        allowNulL:false
    },
    dificultate: {
        type: Sequelize.DOUBLE,
        allowNull:false
    },
    profesorId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

IntrebareGrila.hasMany(VariantaRaspuns, {foreignKey: 'intrebareId', sourceKey: 'id',foreignKeyConstraint: true} )

module.exports = IntrebareGrila

