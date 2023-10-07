// src/pages/api/admin/post/delete/[id].js

import post from "../../../../../data/post.js"

export async function GET({ locals, params, redirect, url }){
    const userAuth = locals.userAuth
    const prisma = locals.prisma
    let currentPage = url.searchParams.get('page') || ''
    if(currentPage){
        currentPage = "?page=" + currentPage
    }
    
    if(userAuth?.userId){
        if(userAuth.userRole !== "Guest"){
            if(userAuth.userRole !== "Admin"){
                const item = await post.getItem({prisma, params})
                if(userAuth.userId === item.userid){
                    await post.delete({prisma, params})
                }
            }else if(userAuth.userRole === "Admin"){
                await post.delete({prisma, params})
            }
        }
        return redirect("/admin"+currentPage, 302)
    }else{
        return redirect('/login', 302)
    }
}