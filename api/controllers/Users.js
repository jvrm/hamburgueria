const Model = require('../models/users')

class User {
    constructor({id, nome, email, senha, numPedido, dataCriacao, dataAtualizacao, versao}){
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.senha = senha,
        this.numPedido = numPedido,
        this.dataCriacao, dataCriacao,
        this.dataAtualizacao = dataAtualizacao,
        this.versao = versao
    }

    async create(){
        const newUser = await Model.insert({
            nome: this.nome,
            email: this.email,
            senha: this.senha
        })
        this.numPedido = newUser.numPedido
        this.id = newUser.id
        this.dataCriacao = newUser.dataCriacao
        this.dataAtualizacao = newUser.dataAtualizacao
        this.versao = newUser.versao
    }

    async loadData(){
        const userFound = await Model.verify(this.id)
        this.nome = userFound.nome
        this.email = userFound.email
        this.senha = userFound.senha
        this.numPedido = userFound.numPedido
        this.dataCriacao = userFound.dataCriacao
        this.dataAtualizacao = userFound.dataAtualizacao
        this.versao = userFound.versao
    }

    async update(){
        await Model.verify(this.id)
        this.validation()
        const newRow = await Model.update(this.id, {
            nome: this.nome,
            email: this.email,
            senha: this.senha
        })

        return newRow;
    }

    validation() {
        const camposObrigatorios = ['nome','email','senha']

        camposObrigatorios.forEach(campo => {
            const value = this[campo]
            if (typeof value !== 'string' || value.length === 0){
                throw new Error(`O Campo '${campo}' precisa ser preenchido corretamente!`)
            }
        })
    }
}

module.exports = User