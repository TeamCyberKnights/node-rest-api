const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Student = require('./Student')
const Echipa = require('./Echipa')


const EvidentaStudentiEchipe = sequelize.define("evidenta_studenti_echipe", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    }
})



Student.belongsToMany(Echipa, {
    as: 'Echipe',
    through: 'evidenta_studenti_echipe',
    foreignKey: 'studentId'
})
// Echipa.belongsToMany(Student, {
//     as: 'Studenti',
//     through: 'evidenta_studenti_echipe',
//     foreignKey: 'echipaId'
// })



module.exports = EvidentaStudentiEchipe


