const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const routesUser = require('./routes/users')
const routesOrder = require('./routes/orders')
const routesItem = require('./routes/items')

app.use(bodyParser.json())

app.use('/api/users', routesUser)

app.use('/ola', (req, res) => {
    res.send("salve")
})

app.use('/api/orders', routesOrder)

app.use('/api/items', routesItem)

app.listen(config.get('api.porta'), () => console.log('API no AR'))

