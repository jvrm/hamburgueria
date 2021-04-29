const Sequelize = require('sequelize')
const instancia = require('../../database/index')
const orders = require('../orders/TableOrder')

const columns = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('hamburguer', 'bebidas', 'outros'),
        allowNull: false
    },
    
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'items',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao',
    
}

module.exports = instancia.define('items', columns, options)