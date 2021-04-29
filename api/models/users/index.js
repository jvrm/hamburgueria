const ModelTable = require('./TableUser')

module.exports = {
    getAll () {
        return ModelTable.findAll() 
    },

    insert (user) {
        return ModelTable.create(user)
    },

    async verify (id) {
        console.log(id)
        const exists = await ModelTable.findOne({
            where: {
                id : id
            }
        })

        if (!exists){
            throw new Error("Usuário não encontrado")
        }

        return exists
    },

    update (id, data){
        return ModelTable.update(
            data,
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