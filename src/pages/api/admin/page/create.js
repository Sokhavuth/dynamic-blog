// src/pages/api/post/create.js

import page from "../../../../data/page.js"

export async function POST({ locals, request, redirect }){
    const prisma = locals.prisma
    const userAdmin = locals.userAdmin

    if(userAdmin){
        const data = await request.formData()
        const title = data.get('title')
        const content = data.get('content')
        const thumb = data.get('thumb')
        const datetime = data.get('datetime')
    
        if(title && thumb && datetime){
            const body = { title, content, thumb, datetime }
            await page.create({ prisma, body })
        }
    }

    return redirect("/admin/page", 302)
}