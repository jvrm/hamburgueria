const Model = require('../models/items')

class Item {
    constructor ({id, nome, descricao, categoria, valor, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.nome = nome
        this.descricao = descricao
        this.categoria = categoria
        this.valor = valor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async create(){
        this.validation()
        const result = await Model.insert({
            nome: this.nome,
            descricao: this.descricao,
            categoria: this.categoria,
            valor: this.valor
        })

        this.id = result.id
        this.dataCriacao = result.dataCriacao
        this.dataAtualizacao = result.dataAtualizacao
        this.versao = result.versao
    }

    async update() {
        console.log(this.id)
        await Model.verify(this.id)
        this.validar()
        const newRow = await Model.update(this.id, {
            nome: this.nome,
            descricao: this.descricao,
            categoria: this.categoria,
            valor: this.valor
        })

        return newRow;
    }

    async loadData() {
        const result = await Model.verify(this.id)
        this.nome = result.nome
        this.descricao = result.descricao
        this.categoria = result.categoria
        this.valor = result.valor
        this.dataCriacao = result.dataCriacao
        this.dataAtualizacao = result.dataAtualizacao
        this.versao = result.versao
    }

    validation() {
        const camposObrigatorios = ['nome', 'descricao', 'categoria', 'valor']

        camposObrigatorios.forEach(campo => {
            const value = this[campo]

            if (campo === 'valor'){
                if (typeof value !== 'number' || value < 0 ) {
                    throw new Error("Campo valor precisa ser preenchido corretamente")
                }
            }else{
                if (typeof value !== 'string' || value.length === 0) {
                    throw new Error(`O '${campo}' precisa ser preenchido corretamente`)
                }
            }
        })

    }
}

module.exports = Item