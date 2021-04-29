const router = require('express').Router()
const Model = require('../models/orders')
const Order = require('../controllers/Orders')

router.get('/', async (req, res) => {
    const orders = await Model.getAll()
    res.status(200)
    res.send(orders)
})

router.get('/:idUser/:numPedido', async (req, res) => {
    try{
        const idUser = req.params.idUser
        const numPedido = req.params.numPedido
        await Model.verify(idUser, numPedido)
        const orders = await Model.getOrders(idUser, numPedido)
        res.status(200)
        res.send(orders)
    } catch(erro){
        res.send(JSON.stringify(
            {erro: erro.message}
        ))
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const dados = req.body
        const newDados = Object.assign({}, dados, {id: id})
        const order = new Order(newDados)
        
        const mensagem = await order.update()
        res.send(JSON.stringify({
            mensagem: mensagem
        }))

    }catch(erro) {
        res.send(
            JSON.stringify({
                erro: erro.message
            })
        )
    }
})

router.post('/', async (req, res) => {
    try{
        const data = req.body
        const order = new Order(data)

        await order.create()
        res.status(200)
        res.send(order)
    }catch(erro) {
        res.status(500)
        res.send(JSON.stringify({
            erro: erro.message
        }))
    }
})

//NESTE CASO ESTARÁ RODANDO UMA PROCEDURE NO BANCO DE DADOS, QUE É EXECUTADA PARA PEGAR TODOS OS REGISTROS DO USUÁRIO E FECHAR SEU PEDIDO
//APÓS FECHAR O CARRINHO, O BANCO IRÁ TROCAR OS DADOS PARA UMA TABELA 'MORTA', A STORE PROCEDURE ACRESCENTARÁ UMA UNIDADE NO CAMPO NUMPEDIDO DO CLIENTE
router.post('/closecart/:idUser/:numPedido', async (req, res) => {
    try{
        const idCliente = req.params.idUser
        const numPedido = req.params.numPedido

        await Model.verify(idCliente, numPedido)

        res.send(JSON.stringify({
            mensagem: "Pedido finalizado!"
        }))
    }catch(erro){
        res.send(JSON.stringify({
            erro: erro.message
        }))
    }

})

router.delete('/:idUser', async (req, res) => {

})

module.exports = router