const router = require('express').Router()
const Model = require('../models/users')
const User = require('../controllers/Users')

router.get('/', async (req, res) => {
    const resultados = await Model.getAll()
    res.status(200)
    res.send(resultados)
})

router.post('/', async (req, res) => {
    try{
        const fields = req.body
        const user = new User(fields)
        await user.create()
        res.status(200)
        res.send(user)
    }catch(erro){
        res.status(500)
        res.send(JSON.stringify({erro: erro.message}))
    }
})

router.get('/:idUser', async (req, res) => {
    try{
        const id = req.params.idUser
        const user = new User({id: id})
        await user.loadData()
        res.send(user)
    }catch(erro){
        res.send(JSON.stringify(
            {erro: erro.message}
        ))
    }
})

//NAS ROTAS DE DELETE, POR NÃO SER NECESSÁRIO DEVOLVER O USUÁRIO DELETADO, NÃO É NECESSÁRIO INSTÂNCIAR UM NOVO OBJETO DE USER, POR ISSO
//CHAMEI O MODEL DE UMA VEZ, MAS CASO SEJA NECESSÁRIO DEVOLVER, BASTA INSTANCIAR UM NOVO OBJETO, CHAMAR O MODEL.DELETE DENTRO DA CLASSE, E RETORNAR
//O USUÁRIO DELETADO

router.delete('/:idUser', async (req, res) => {
    try{
        const id = req.params.idUser
        await Model.verify(id)
        const deletado = await Model.delete(id)
        console.log(deletado)
        res.send(JSON.stringify(deletado))

    }catch(erro){
        res.send(JSON.stringify({erro:erro.message}))
    }
})

router.put('/:idUser', async (req, res) => {
    try{
        const id = req.params.idUser
        const fieldsBody = req.body
        const fields = Object.assign({}, fieldsBody, {id: id})
        const user = new User(fields)
        await user.update()
        res.status(200)
        res.send(user)
    }catch(erro){
        res.send(JSON.stringify({erro: erro.message}))
    }
})

module.exports = router