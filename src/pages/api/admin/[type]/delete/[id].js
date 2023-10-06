// src/pages/api/post/delete/[id].js

export async function GET({ locals, params, redirect }){
    const userAuth = locals.userAuth
    const prisma = locals.prisma
    const type = params.type

    if(type === 'post'){
        var route = '/admin'
    }
    
    const rawModule = await import(`../../../../../data/${type}`)
    const module = rawModule.default

    if(userAuth?.userId){
        if(userAuth.userRole !== "Guest"){
            if(userAuth.userRole !== "Admin"){
                const item = await module.getItem({prisma, params})
                if(userAuth.userId === item.userid){
                    await module.delete({prisma, params})
                }
            }else if(userAuth.userRole === "Admin"){
                await module.delete({prisma, params})
            }
        }
        return redirect(route, 302)
    }else{
        return redirect('/login', 302)
    }
}