// src/data/page.js

class Page{
    async count(req, query={}){
        return await req.prisma.page.count(query)
    }

    async create(req){
        const new_page = {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }
        
        await req.prisma.page.create({ data: new_page })
    }

    async delete(req){
        await req.prisma.page.delete({ where: {id: req.params.id } })
    }

    async getItems(req, amount){
        return await req.prisma.page.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async paginate(req, amount){
        const pages = await req.prisma.page.findMany({ 
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount * (parseInt(req.currentPage) - 1),
            take: amount
        })

        return pages
    }
}

export default new Page()