// src/pages/api/post/delete/[id].js

import post from "../../../../data/post.js"

export async function GET({ locals, params, redirect }){
    const userAuth = locals.userAuth
    const prisma = locals.prisma
    if(userAuth?.userId){
        if(userAuth.userRole !== "Guest"){
            if(userAuth.userRole !== "Admin"){
                const item = await post.getPost({prisma, params})
                if(userAuth.userId === item.userid){
                    await post.delete({prisma, params})
                }
            }else if(userAuth.userRole === "Admin"){
                await post.delete({prisma, params})
            }
        }
        return redirect('/admin', 302)
    }else{
        return redirect('/login', 302)
    }
}