const ModelTable = require('./TableItem')

module.exports = {
    getAll () {
        return ModelTable.findAll()
    },

    insert (item) {
        return ModelTable.create(item)
    },

    async verify (id) {
        console.log(id)
        const exists = await ModelTable.findOne({
            where: {
                id : id
            }
        })

        if (!exists){
            throw new Error("Item não encontrado")
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