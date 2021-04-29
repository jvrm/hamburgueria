const Model = require('../models/orders')

class Order{
    constructor({id, idCliente, idItem, quantidade, numPedido, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.idCliente = idCliente
        this.idItem = idItem
        this.quantidade = quantidade
        this.numPedido = numPedido
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao

        console.log(this.numPedido)
    }
    
    async create() {
        this.validation() //REALIZA A VERIFICAÇÃO SE OS CAMPOS OBRIGATÓRIOS ESTÃO PREENCHIDOS

        const data = {
            idCliente: this.idCliente,
            idItem: this.idItem,
            quantidade: this.quantidade,
            numPedido: this.numPedido

        }
        const existe = await Model.verifyIfOrderExists(data)

        if (existe === "NO"){ //CASO RETORNE NO, ELE ADICIONA UM REGISTRO NA TABELA
            const order = await Model.insert(data)
            this.id = order.id
            this.dataCriacao = order.dataCriacao
            this.dataAtualizacao = order.dataAtualizacao
            this.versao = order.versao
            return order
        }

        //CASO ELE ENCONTRE UM REGISTRO, IREMOS SOMAR A QUANTIDADE DO ÍTEM NO CARRINHO ATUAL DO CLIENTE, CARREGANDO A CLASSE, EM SEGUIDA, DANDO UM UPDATE NO CAMPO QUANTIDADE

        await this.loadData()
        await Model.update(this.id, this.quantidade)
    }

    async update() { //VERIFICA SE A QUANTIDADE ALTERADA FOR 0, CASO SEJA, ELE EXCLUI O PEDIDO DO CARRINHO, CASO CONTRÁRIO, ATUALIZA OS DADOS
        this.quantidade ++ //ACRESCENTA UMA UNIDADE PARA PASSAR NA ROTINA VALIDATION
        this.validation()

        await Model.verifyId(this.id)
        
        await Model.verify(this.idCliente, this.numPedido)
        if (this.quantidade < 2){
            await Model.delete(this.id)
            return "Ítem removido com sucesso do seu carrinho"
        }
        await Model.update(this.id, this.quantidade)
        return "Quantidade atualizada com sucesso";
    }

    async loadData() {
        const result = await Model.loadData({
            idCliente: this.idCliente,
            idItem: this.idItem,
            numPedido: this.numPedido
        })
        this.id = result.id,
        this.quantidade = result.quantidade + this.quantidade
    }

    //FAZ UMA VERIFICAÇÃO SE TODOS OS CAMPOS NECESSÁRIOS ESTÃO PREENCHIDOS E COM O TIPO CORRETO
    validation() {
        const camposObrigatorios = ['idCliente','idItem','quantidade', 'numPedido']

        camposObrigatorios.forEach(campo => {
            const value = this[campo]
            console.log(typeof value)
            if (!Number.isInteger(value) || value < 1){
                throw new Error(`O Campo '${campo}' precisa ser preenchido corretamente!`)
            }
        })
    }
}

module.exports = Order