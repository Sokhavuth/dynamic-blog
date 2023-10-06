// src/pages/api/post/create.js

import post from "../../../data/post.js"

export async function POST({ locals, request, redirect }){
    const prisma = locals.prisma
    const userAuth = locals.userAuth

    if(userAuth.userRole !== "Guest"){
        const data = await request.formData()
        const title = data.get('title')
        const content = data.get('content')
        const categories = data.get('categories')
        const thumb = data.get('thumb')
        const datetime = data.get('datetime')
        const videos = data.get('videos')
    
        if((title && categories && thumb && datetime)){
            const body = {title, content, categories, thumb, datetime, videos}
            await post.create({ prisma, body, userAuth })
        }
    }

    return redirect('/admin', 302)
}