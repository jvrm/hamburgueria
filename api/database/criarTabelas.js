const TableUser = require('../models/users/TableUser')
const TableOrder = require('../models/orders/TableOrder')
const TableItem = require('../models/items/TableItem')

TableUser
    .sync()
    .then(() => console.log("A tabela User foi criada com sucesso"))
    .catch(console.log)

TableItem
    .sync()
    .then(() => console.log("A tabela Item foi criada com sucesso"))
    .catch(console.log)

TableOrder
    .sync()
    .then(() => console.log("A tabela Order foi criada com sucesso"))
    .catch(console.log)