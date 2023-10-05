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

    async getPosts(req, amount){
        return await req.prisma.post.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async getPost(req){
        return await req.prisma.post.findUnique({ where: {id: req.params.id }})
    }

    async delete(req){
        await req.prisma.post.delete({ where: {id: req.params.id } })
    }
}

export default new Post()