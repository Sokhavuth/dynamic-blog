// src/pages/api/logout.js

export async function GET({ locals, cookies, redirect }){
    if(locals.userAuth){
        cookies.delete("access_token", { path: '/' })
    }
    
    return redirect('/login', 302)
}