const ModelTable = require('./TableOrder')

module.exports = {
    getAll () {
        return ModelTable.findAll()
    },

    insert (item) {
        return ModelTable.create(item)
    },

    async getOrders(idUser, numPedido){
        return await ModelTable.findAll({
            where: { 
                idcliente : idUser, 
                numPedido : numPedido 
            }
        })
    },

    //CASO O NUMPEDIDO SEJA VAZIO, ESSA ROTINA VERIFICA APENAS SE O CLIENTE EXISTE
    //CASO O NUMPEDIDO SEJA PASSADO, ESSA ROTINA VERIFICA SE HÁ O CLIENTE E SE HÁ ALGUM PEDIDO COM SUA ID E SEU NUMPEDIDO ATUAL
    async verify (idcliente, numPedido) {
        let exists = {}
        if (!numPedido){
            exists = await ModelTable.findOne({
            where: {
                idcliente : idcliente
                }
            })
        }else{
            console.log(idcliente, numPedido)
            exists = await ModelTable.findOne({
                where: {
                    idCliente : idcliente,
                    numPedido : numPedido
                    }
                })
        }

        console.log(exists)

        if (!exists){
            throw new Error("Não há registros com os dados fornecidos. Verifique!")
        }

        return exists
    },

    //ESTA ROTINA VERIFICA SE NO PEDIDO ATUAL HÁ ALGUM ROW COM O MESMO ÍTEM, CASO ENCONTRE, A QUANTIDADE SERÁ SOMADA
    //POR EXEMPLO, SE O CLIENTE ADICIONAR UMA BATATA, E ADICIONAR OUTRA BATATA, AO INVÉS DE DUAS LINHAS COM O PRODUTO, SERÁ UMA LINHA COM A QTDE = 2
    async verifyIfOrderExists({idCliente, idItem, numPedido}){
        let exists = {}
        console.log(idCliente, idItem, numPedido)
        exists = await ModelTable.findOne({
            where: {
                idCliente: idCliente,
                idItem: idItem,
                numPedido: numPedido
            }
        })

        if (exists){
            return "OK"
        }else{
            return "NO"
        }
    },

    async loadData({idCliente, idItem, numPedido}){
        console.log(idCliente)
        return ModelTable.findOne({
            where: {
                idCliente: idCliente,
                idItem: idItem,
                numPedido: numPedido
            }
        })
    },

    async verifyId(id){
        const exists = await ModelTable.findOne({
            where: {
                id : id
            }
        })

        if (!exists){
            throw new Error("Registro não encontrado")
        }
    },

    update (id, quantidade){
        return ModelTable.update(
            {
                quantidade: quantidade
            },
            {
                where: {id: id}
            }
        )
    },

    delete (id){
        return ModelTable.destroy({
            where: {id: id}
        })
    }
}