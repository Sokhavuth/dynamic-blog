// src/data/post.js

class Post{
    async count(req, query={}){
        return await req.prisma.post.count(query)
    }

    async create(req){
        const categories = req.body.categories
        let Categories = []

        if(categories.includes(',')){
            let str = categories.replace(/\s+/g, "")
            Categories = str.split(',')
        }else{
            Categories = [categories]
        }
        
        const new_post = {
            title: req.body.title,
            content: req.body.content,
            categories: Categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos,
            userid: req.userAuth.userId,
        }
        
        await req.prisma.post.create({ data: new_post })
    }

    async getItems(req, amount){
        return await req.prisma.post.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async getItem(req){
        return await req.prisma.post.findUnique({ where: {id: req.params.id }})
    }

    async delete(req){
        await req.prisma.post.delete({ where: {id: req.params.id } })
    }

    async update(req){
        const categories = req.body.categories
        let Categories = []

        if(categories.includes(',')){
            let str = categories.replace(/\s+/g, "")
            Categories = str.split(',')
        }else{
            Categories = [categories]
        }

        let newvalue = {
            title: req.body.title,
            content: req.body.content,
            categories: Categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos
        }
     
        await req.prisma.post.update({ where: {id: req.params.id }, data: newvalue })
    }
}

export default new Post()