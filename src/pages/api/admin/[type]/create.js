// src/pages/api/post/create.js

export async function POST({ locals, request, redirect, params }){
    const prisma = locals.prisma
    const userAuth = locals.userAuth
    const type = params.type

    if(type === "post"){
        var route = '/admin'
    }

    const rawModule = await import(`../../../../data/${type}`)
    const module = rawModule.default

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
            await module.create({ prisma, body, userAuth })
        }
    }

    return redirect(route, 302)
}