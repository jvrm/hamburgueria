const Sequelize = require('sequelize')
const orders = require('../orders/TableOrder.js')
const instancia = require('../../database/index')

const columns = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numPedido: {
        type: Sequelize.INTEGER,
        default: 0
    }

}

const options = {
    freezeTableName: true,
    tableName: 'users',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao',
    
}

module.exports = instancia.define('users', columns, options)