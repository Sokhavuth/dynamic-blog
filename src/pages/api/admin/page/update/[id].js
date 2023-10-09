// src/pages/api/admin/page/update/[id].js

import page from "../../../../../data/page.js"

export async function POST({ locals, redirect, params, request, url}){
    const userAuth = locals.userAuth
    const userAdmin = locals.userAdmin
    const prisma = locals.prisma
    let currentPage = url.searchParams.get('page') || ''
    if(currentPage){
        currentPage = "?page=" + currentPage
    }

    if(userAuth?.userId){
        if(userAdmin){
            const data = await request.formData()

            const title = data.get('title')
            const content = data.get('content')
            const thumb = data.get('thumb')
            const datetime = data.get('datetime')
    
            if(title && thumb && datetime){
                const body = { title, content, thumb, datetime }
                await page.update({ prisma, body, params })
            }
        }

        return redirect("/admin/page"+currentPage, 302)
    }

    return redirect('/login', 302)
}