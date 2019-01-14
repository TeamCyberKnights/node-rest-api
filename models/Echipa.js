const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize


const Echipa = sequelize.define('echipa', {

    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nume: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports =  Echipa

