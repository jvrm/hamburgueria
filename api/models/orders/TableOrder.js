const Sequelize = require('sequelize')
const instancia = require('../../database/index')

const columns = {
    idCliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idItem: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numPedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}

const options = {
    freezeTableName: true,
    tableName: 'orders',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao',
    
}

module.exports = instancia.define('orders', columns, options)