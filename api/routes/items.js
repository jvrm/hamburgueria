const router = require('express').Router()
const Model = require('../models/items')
const Item = require('../controllers/Items')

router.get('/', async (req, res) => {
    const resultados = await Model.getAll()
    res.status(200)
    res.send(resultados)
})

router.get('/:idItem', async (req, res) => {
    try{
        const id = req.params.idItem
        const item = new Item({ id : id })
        await item.loadData()
        res.send(JSON.stringify(item))
    }catch(erro){
        res.send(JSON.stringify(
            {erro: erro.message}
        ))
    }
})

router.post('/', async (req, res) => {
    try{
        const fields = req.body
        const item = new Item(fields)
        await item.create()
        res.status(200)
        res.send(item)
    }catch(erro){
        res.status(500)
        res.send(JSON.stringify({erro: erro.message}))
    }
})

router.put('/:idItem', async (req, res) => {
    try{
        const id = req.params.idItem;
        const fieldsBody = req.body
        const fields = Object.assign({}, fieldsBody, {id: id})
        const item = new Item(fields)
        await item.update()
        res.status(204)
        res.end()
        
    }catch(erro){
        res.send(JSON.stringify({erro: erro.message}))
    }

})

router.delete('/:idItem', async (req, res) => {
    try{
        const id = req.params.idItem;
        await Model.verify(id)
        await Model.delete(id)
        res.status(204)
        res.send(JSON.stringify(
            {message: "Dados excluídos com Sucesso!"}
        ))
    }catch(erro) {
        res.send(JSON.stringify(
            {erro: erro.message}
        ))
    }
})

module.exports = router