// src/pages/api/admin/[type]/edit/[id].js

export async function POST({ locals, redirect, params, request}){
    const userAuth = locals.userAuth
    const prisma = locals.prisma
    const type = params.type

    if(type === "post"){
        var route = '/admin'
    }

    const rawModule = await import(`../../../../../data/${type}`)
    const module = rawModule.default

    if(userAuth?.userId){
        if(userAuth.userRole !== "Guest"){
            const data = await request.formData()
            const title = data.get('title')
            const content = data.get('content')
            const categories = data.get('categories')
            const thumb = data.get('thumb')
            const datetime = data.get('datetime')
            const videos = data.get('videos')
    
            if(title && categories && thumb && datetime){
                const body = {title, content, categories, thumb, datetime, videos}
                if(userAuth.userRole === "Admin"){
                    await module.update({ prisma, body, params })
                }else if(userAuth.userRole === "Author"){
                    const item = await module.getItem({prisma, params})
                    if(userAuth.userId === item.userid){
                        await module.update({ prisma, body, params })
                    }
                }
            }
        }

        return redirect(route, 302)
    }

    return redirect('/login', 302)
}