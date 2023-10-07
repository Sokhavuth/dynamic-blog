// src/pages/api/admin/page/delete/[id].js

import page from "../../../../../data/page.js"

export async function GET({ locals, params, redirect, url }){
    const userAdmin = locals.userAdmin
    const userAuth = locals.userAuth
    const prisma = locals.prisma
    
    let currentPage = url.searchParams.get('page') || ''
    if(currentPage){
        currentPage = "?page=" + currentPage
    }
    
    if(userAuth?.userId){
        if(userAdmin){
            await page.delete({prisma, params})
        }
        return redirect("/admin/page"+currentPage, 302)
    }else{
        return redirect('/login', 302)
    }
}