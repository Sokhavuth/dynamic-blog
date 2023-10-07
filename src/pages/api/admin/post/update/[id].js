// src/pages/api/admin/post/update/[id].js

import post from "../../../../../data/post.js"

export async function POST({ locals, redirect, params, request, url}){
    const userAuth = locals.userAuth
    const prisma = locals.prisma
    let currentPage = url.searchParams.get('page') || ''
    if(currentPage){
        currentPage = "?page=" + currentPage
    }

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
                    await post.update({ prisma, body, params })
                }else if(userAuth.userRole === "Author"){
                    const item = await post.getItem({prisma, params})
                    if(userAuth.userId === item.userid){
                        await post.update({ prisma, body, params })
                    }
                }
            }
        }

        return redirect("/admin"+currentPage, 302)
    }

    return redirect('/login', 302)
}