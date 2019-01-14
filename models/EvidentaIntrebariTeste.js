const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Test = require('./Test')
const Intrebare = require('./IntrebareGrila')

const EvidentaIntrebariTeste = sequelize.define("evidenta_intrebari_teste", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    }
})

Test.belongsToMany(Intrebare, {as: 'Intrebari',
    through: 'evidenta_intrebari_teste', foreignKey: 'testId',constraints: false
})
// Intrebare.belongsToMany(Test, {as: 'Teste',
//     through: 'evidenta_intrebari_teste', foreignKey: 'intrebareId',constraints: false
//
// })



module.exports = EvidentaIntrebariTeste

